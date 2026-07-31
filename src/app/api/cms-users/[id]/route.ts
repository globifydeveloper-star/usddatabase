import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

// A superadmin account can only be disabled, demoted, or deleted while at
// least one *other* superadmin row still exists — otherwise nobody could
// manage the CMS anymore. Returns an error message when the change would
// leave zero other superadmins, or null when it's safe to proceed.
async function blockedByLastSuperadminRule(
  targetId: number,
  currentRole: string
): Promise<string | null> {
  if (currentRole !== 'superadmin') return null;
  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM cms_users WHERE role = 'superadmin' AND id <> $1`,
    [targetId]
  );
  const otherSuperadmins = Number(rows[0].count);
  return otherSuperadmins === 0
    ? 'Add another superadmin with full access before disabling, demoting, or deleting the only superadmin'
    : null;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }

  try {
    const body = await request.json();
    const { role, is_active, password } = body;

    if (role !== undefined) {
      const defaultRoles = ['superadmin', 'editor', 'viewer'];
      const { rows: dbRoles } = await pool.query('SELECT role_name FROM roles');
      const validRoles = new Set([
        ...defaultRoles,
        ...dbRoles.map((r) => r.role_name.trim().toLowerCase().replace(/\s+/g, '_')),
        ...dbRoles.map((r) => r.role_name.trim().toLowerCase()),
      ]);

      if (!validRoles.has(role.toLowerCase())) {
        return NextResponse.json({ success: false, message: 'Invalid role' }, { status: 400 });
      }
    }

    const { id } = await params;
    const targetId = Number(id);
    const existing = await pool.query('SELECT role FROM cms_users WHERE id = $1', [targetId]);
    if (existing.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const targetRole = existing.rows[0].role as string;

    if (auth.role !== 'superadmin') {
      if (targetRole !== 'viewer') {
        return NextResponse.json(
          { success: false, message: 'Admins can only disable viewer accounts' },
          { status: 403 }
        );
      }
      if (role !== undefined && role !== 'viewer') {
        return NextResponse.json(
          { success: false, message: 'Admins can only disable viewer accounts' },
          { status: 403 }
        );
      }
      if (password !== undefined) {
        return NextResponse.json(
          { success: false, message: 'Admins can only disable viewer accounts' },
          { status: 403 }
        );
      }
    }

    const wouldDemote = auth.role === 'superadmin' && role !== undefined && role !== 'superadmin';
    const wouldDisable = is_active === false;
    if (wouldDemote || wouldDisable) {
      const blockedMessage = await blockedByLastSuperadminRule(targetId, targetRole);
      if (blockedMessage) {
        return NextResponse.json({ success: false, message: blockedMessage }, { status: 400 });
      }
    }

    const setParts: string[] = [];
    const values: any[] = [];

    if (role !== undefined) {
      values.push(role);
      setParts.push(`role = $${values.length}`);
    }
    if (is_active !== undefined) {
      values.push(is_active);
      setParts.push(`is_active = $${values.length}`);
      if (is_active === false) {
        setParts.push('session_version = session_version + 1');
      }
    }
    if (password) {
      values.push(await bcrypt.hash(password, 10));
      setParts.push(`password_hash = $${values.length}`);
    }

    if (setParts.length === 0) {
      return NextResponse.json({ success: false, message: 'No data provided' }, { status: 400 });
    }
    setParts.push('updated_at = now()');

    values.push(id);
    const result = await pool.query(
      `UPDATE cms_users SET ${setParts.join(', ')} WHERE id = $${values.length}
       RETURNING id, email, role, is_active, created_at, updated_at`,
      values
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    await logAudit(auth, {
      table_name: 'cms_users',
      action: 'update',
      record_id: result.rows[0].id,
    });

    return NextResponse.json({ success: true, message: 'Updated successfully', data: result.rows[0] });
  } catch (error: any) {
    console.error('Update cms_user Error:', error);
    return NextResponse.json(
      { success: false, message: error?.detail || 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }
  if (auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const targetId = Number(id);

  const existing = await pool.query('SELECT role FROM cms_users WHERE id = $1', [targetId]);
  if (existing.rowCount === 0) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  const blockedMessage = await blockedByLastSuperadminRule(targetId, existing.rows[0].role);
  if (blockedMessage) {
    return NextResponse.json({ success: false, message: blockedMessage }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // cms_editor_table_permissions.granted_by is ON DELETE RESTRICT, so
    // hand off any grants this user made to the superadmin doing the delete
    // before removing the row. editor_user_id is ON DELETE CASCADE, so
    // permissions granted TO this user (if they were an editor) clean up
    // automatically.
    await client.query(
      'UPDATE cms_editor_table_permissions SET granted_by = $1 WHERE granted_by = $2',
      [auth.userId, targetId]
    );
    const result = await client.query(
      'DELETE FROM cms_users WHERE id = $1 RETURNING id, email, role',
      [targetId]
    );
    await client.query('COMMIT');

    await logAudit(auth, {
      table_name: 'cms_users',
      action: 'delete',
      record_id: result.rows[0].id,
    });

    return NextResponse.json({ success: true, message: 'Deleted successfully', data: result.rows[0] });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Delete cms_user Error:', error);
    return NextResponse.json(
      { success: false, message: error?.detail || 'Delete failed' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
