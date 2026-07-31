import 'server-only';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/db';
import { signAuthToken, AUTH_COOKIE_NAME } from '@/lib/jwt';

function clientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT id, email, password_hash, role, is_active, session_version FROM cms_users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];

    // Generic message for "no such user" / "wrong password" to avoid leaking
    // which emails are registered. Only once the password is confirmed
    // correct do we reveal the account-disabled state.
    const invalid = () =>
      NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });

    if (!user) return invalid();
    if (!(await bcrypt.compare(password, user.password_hash))) return invalid();
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

    await pool.query(
      `INSERT INTO cms_login_history (user_id, email, role, device, ip_address, session_version)
       VALUES ($1, $2, $3, $4, $5, $6)`,
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
