import 'server-only';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/db';
import { signAuthToken, AUTH_COOKIE_NAME } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT id, email, password_hash, role, is_active FROM cms_users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];

    // Same generic message for "no such user" / "inactive" / "wrong password"
    // to avoid leaking which emails are registered.
    const invalid = () =>
      NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });

    if (!user || !user.is_active) return invalid();
    if (!(await bcrypt.compare(password, user.password_hash))) return invalid();

    const token = await signAuthToken({ userId: Number(user.id), email: user.email, role: user.role });

    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60,
    });
    return res;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
