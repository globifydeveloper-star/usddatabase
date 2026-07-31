import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

// Bumps cms_users.session_version, which getAuthContext() compares against
// the session_version embedded in each user's JWT on every subsequent API
// call — any token issued under the old version is rejected. Doesn't
// require knowing whether the user is currently "online".
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }
  if (auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const targetId = Number(id);

  if (targetId === auth.userId) {
    return NextResponse.json(
      { success: false, message: 'You cannot force logout yourself' },
      { status: 400 }
    );
  }

  const existing = await pool.query('SELECT id, email, role FROM cms_users WHERE id = $1', [targetId]);
  if (existing.rowCount === 0) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  const targetUser = existing.rows[0];
  if (targetUser.role === 'superadmin') {
    return NextResponse.json(
      { success: false, message: 'Cannot force logout another Superadmin' },
      { status: 403 }
    );
  }

  const result = await pool.query(
    `UPDATE cms_users SET session_version = session_version + 1, updated_at = now() WHERE id = $1
     RETURNING id, email, role`,
    [targetId]
  );

  await logAudit(auth, {
    table_name: 'cms_users',
    action: 'force_logout',
    record_id: result.rows[0].id,
  });

  return NextResponse.json({
    success: true,
    message: `${result.rows[0].email} has been logged out and will need to sign in again`,
    data: result.rows[0],
  });
}
