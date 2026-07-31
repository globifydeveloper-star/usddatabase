import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

// Sets cms_users.force_logout_after = now(), which getAuthContext() checks
// on every subsequent API call — any token issued before this moment is
// rejected. Doesn't require knowing whether the user is currently "online".
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthContext(request);
  if (!auth || (auth.role !== 'superadmin' && auth.role !== 'editor')) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const targetId = Number(id);

  const existing = await pool.query('SELECT id, email, role FROM cms_users WHERE id = $1', [targetId]);
  if (existing.rowCount === 0) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  const targetUser = existing.rows[0];
  if (auth.role === 'editor' && targetUser.role !== 'viewer') {
    return NextResponse.json(
      { success: false, message: 'Admins can only force logout viewer accounts' },
      { status: 403 }
    );
  }

  const result = await pool.query(
    `UPDATE cms_users SET force_logout_after = now() WHERE id = $1
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
