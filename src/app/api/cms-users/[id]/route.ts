import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

// No DELETE — users are deactivated (is_active: false), never hard-deleted,
// since cms_editor_table_permissions.granted_by references cms_users
// ON DELETE RESTRICT.
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { role, is_active, password } = body;

    if (role !== undefined && !['superadmin', 'editor', 'viewer'].includes(role)) {
      return NextResponse.json({ success: false, message: 'Invalid role' }, { status: 400 });
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
    }
    if (password) {
      values.push(await bcrypt.hash(password, 10));
      setParts.push(`password_hash = $${values.length}`);
    }

    if (setParts.length === 0) {
      return NextResponse.json({ success: false, message: 'No data provided' }, { status: 400 });
    }
    setParts.push('updated_at = now()');

    values.push(params.id);
    const result = await pool.query(
      `UPDATE cms_users SET ${setParts.join(', ')} WHERE id = $${values.length}
       RETURNING id, email, role, is_active, created_at, updated_at`,
      values
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', data: result.rows[0] });
  } catch (error: any) {
    console.error('Update cms_user Error:', error);
    return NextResponse.json(
      { success: false, message: error?.detail || 'Server error' },
      { status: 500 }
    );
  }
}
