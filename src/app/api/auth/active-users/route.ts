import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }
  if (auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT
         l.user_id,
         l.email,
         l.role,
         l.login_at,
         l.device,
         l.ip_address
       FROM cms_login_history l
       LEFT JOIN cms_users u ON u.id = l.user_id
       WHERE l.logout_at IS NULL
         AND (u.id IS NULL OR l.session_version IS NULL OR l.session_version = u.session_version)
       ORDER BY l.login_at DESC`
    );

    return NextResponse.json({ success: true, users: rows });
  } catch (error) {
    console.error('Get active users Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
