import 'server-only';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool, ensureSessionSchema } from '@/lib/db';
import { signAuthToken, AUTH_COOKIE_NAME } from '@/lib/jwt';
import { rateLimit, tooManyRequestsResponse } from '@/lib/rate-limit';

function clientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limiter = rateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!limiter.success) {
      return tooManyRequestsResponse(limiter.reset);
    }

    const { email, password, rememberMe } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT id, email, password_hash, role, is_active, session_version FROM cms_users WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    const user = result.rows[0];

    // Generic message for "no such user" / "wrong password" to avoid leaking
    // which emails are registered. Only once the password is confirmed
    // correct do we reveal the account-disabled state.
    const invalid = () =>
      NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });

    if (!user) return invalid();

    let passwordValid = await bcrypt.compare(password, user.password_hash);

    // If local password check fails for superadmin, check Firebase Auth (e.g. after resetting password via Firebase email link)
    if (!passwordValid && user.role.toLowerCase() === 'superadmin') {
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY;
      if (apiKey) {
        try {
          const fbRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password, returnSecureToken: true }),
          });
          if (fbRes.ok) {
            passwordValid = true;
            // Seamlessly sync newly reset password hash back into local PostgreSQL cms_users database
            const newHash = await bcrypt.hash(password, 10);
            await pool.query(
              'UPDATE cms_users SET password_hash = $1, session_version = session_version + 1, updated_at = NOW() WHERE id = $2',
              [newHash, user.id]
            ).catch((err) => console.warn('[Login] Failed to align local DB password_hash:', err));
          }
        } catch (fbErr) {
          console.warn('[Login] Firebase Auth fallback check warning:', fbErr);
        }
      }
    }

    if (!passwordValid) return invalid();

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: 'Your account is inactive. Please contact the SuperAdmin.' },
        { status: 403 }
      );
    }

    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 8 * 60 * 60; // 30 days vs 8 hours
    const token = await signAuthToken(
      {
        userId: Number(user.id),
        email: user.email,
        role: user.role,
        sessionVersion: Number(user.session_version),
      },
      rememberMe ? '30d' : '8h'
    );

    await ensureSessionSchema();

    // Close any previous open sessions for this user before creating a new one
    await pool.query(
      `UPDATE cms_login_history
       SET logout_at = NOW(),
           session_duration_seconds = EXTRACT(EPOCH FROM (NOW() - login_at))::int
       WHERE user_id = $1 AND logout_at IS NULL`,
      [user.id]
    ).catch((err) => console.warn('[Login] Failed to close previous sessions:', err));

    await pool.query(
      `INSERT INTO cms_login_history (user_id, email, role, device, ip_address, session_version, last_seen_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [
        user.id,
        user.email,
        user.role,
        request.headers.get('user-agent') || 'unknown',
        clientIp(request),
        Number(user.session_version),
      ]
    ).catch((error) => console.error('Insert cms_login_history Error:', error));

    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });
    return res;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
