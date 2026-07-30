import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/jwt';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const auth = token ? await verifyAuthToken(token) : null;

  if (auth) {
    // Close out the most recent open session for this user.
    await pool
      .query(
        `UPDATE cms_login_history
         SET logout_at = now(),
             session_duration_seconds = EXTRACT(EPOCH FROM (now() - login_at))::int
         WHERE id = (
           SELECT id FROM cms_login_history
           WHERE user_id = $1 AND logout_at IS NULL
           ORDER BY login_at DESC
           LIMIT 1
         )`,
        [auth.userId]
      )
      .catch((error) => console.error('Update cms_login_history Error:', error));
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
