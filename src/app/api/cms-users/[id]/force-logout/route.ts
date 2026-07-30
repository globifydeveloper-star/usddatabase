import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

// Sets cms_users.force_logout_after = now(), which getAuthContext() checks
// on every subsequent API call — any token issued before this moment is
// rejected. Doesn't require knowing whether the user is currently "online".
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const targetId = Number(params.id);
  const result = await pool.query(
    `UPDATE cms_users SET force_logout_after = now() WHERE id = $1
     RETURNING id, email, role`,
    [targetId]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

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
