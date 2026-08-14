import 'server-only';
import { NextResponse } from 'next/server';
import { pool, ensureSessionSchema } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';

export async function POST(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }

  const sessionVersion = request.headers.get('x-cms-session-version');

  try {
    await ensureSessionSchema();
    await pool.query(
      `UPDATE cms_login_history
       SET last_seen_at = NOW()
       WHERE id IN (
         SELECT id FROM cms_login_history
         WHERE user_id = $1
           AND logout_at IS NULL
           AND (session_version IS NULL OR session_version = $2)
         ORDER BY login_at DESC
         LIMIT 1
       )`,
      [auth.userId, sessionVersion ? Number(sessionVersion) : null]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Heartbeat Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
