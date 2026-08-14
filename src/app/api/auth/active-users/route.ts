import 'server-only';
import { NextResponse } from 'next/server';
import { pool, ensureSessionSchema } from '@/lib/db';
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
    await ensureSessionSchema();

    // Auto-cleanup stale sessions that were never logged out and have had no activity for over 1 day
    await pool.query(
      `UPDATE cms_login_history
       SET logout_at = COALESCE(last_seen_at, login_at),
           session_duration_seconds = EXTRACT(EPOCH FROM (COALESCE(last_seen_at, login_at) - login_at))::int
       WHERE logout_at IS NULL AND COALESCE(last_seen_at, login_at) < NOW() - INTERVAL '1 day'`
    ).catch((err) => console.warn('[active-users] Stale cleanup warning:', err));

    const { rows } = await pool.query(
      `SELECT * FROM (
         SELECT DISTINCT ON (l.user_id)
           l.user_id,
           l.email,
           l.role,
           l.login_at,
           COALESCE(l.last_seen_at, l.login_at) AS last_seen_at,
           l.device,
           l.ip_address
         FROM cms_login_history l
         LEFT JOIN cms_users u ON u.id = l.user_id
         WHERE l.logout_at IS NULL
           AND COALESCE(l.last_seen_at, l.login_at) >= NOW() - INTERVAL '5 minutes'
           AND (u.id IS NULL OR l.session_version IS NULL OR l.session_version = u.session_version)
           AND (u.is_active IS DISTINCT FROM false)
         ORDER BY l.user_id, COALESCE(l.last_seen_at, l.login_at) DESC
       ) sub
       ORDER BY sub.last_seen_at DESC`
    );

    return NextResponse.json({ success: true, users: rows });
  } catch (error) {
    console.error('Get active users Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
