import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { rateLimit, getClientIp, tooManyRequestsResponse } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limiter = rateLimit(`forgot-password:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!limiter.success) {
      return tooManyRequestsResponse(limiter.reset);
    }

    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    // Verify in CMS database that account exists, is active, and is a Superadmin (case-insensitive)
    const userRes = await pool.query('SELECT email, role, is_active FROM cms_users WHERE LOWER(email) = LOWER($1)', [email]);
    if ((userRes.rowCount ?? 0) === 0) {
      return NextResponse.json(
        { success: false, message: `The email "${email}" is not registered in the system.` },
        { status: 400 }
      );
    }

    const user = userRes.rows[0];
    const targetEmail = user.email;
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: 'This account has been deactivated. Please contact a Superadmin.' },
        { status: 400 }
      );
    }

    if (user.role.toLowerCase() !== 'superadmin') {
      return NextResponse.json(
        {
          success: false,
          message: 'Only Superadmin accounts can request password reset links. For other account roles, please contact a Superadmin to reset your password in the Users list.',
        },
        { status: 403 }
      );
    }

    const apiKey =
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      process.env.FIREBASE_API_KEY;

    if (!apiKey) {
      console.error('[Forgot Password] Missing Firebase API Key in process.env');
      return NextResponse.json(
        {
          success: false,
          message:
            'Firebase API Key is missing in .env.local (NEXT_PUBLIC_FIREBASE_API_KEY). Please add your Web API Key from Firebase Console and restart the dev server.',
        },
        { status: 400 }
      );
    }

    console.log(`[Forgot Password] Requesting reset link for email: ${email} via project usdegreeadmin`);

    const firebaseRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: targetEmail,
        }),
      }
    );

    const data = await firebaseRes.json();
    console.log('[Forgot Password] Firebase API response status:', firebaseRes.status, data);

    if (!firebaseRes.ok) {
      const errCode = data?.error?.message;
      let userFriendlyMessage = 'Failed to send password reset email.';

      if (errCode === 'EMAIL_NOT_FOUND') {
        userFriendlyMessage = `The email "${email}" is not registered in Firebase Authentication (project: usdegreeadmin). Please add this user in Firebase Console -> Authentication -> Users.`;
      } else if (errCode === 'OPERATION_NOT_ALLOWED') {
        userFriendlyMessage =
          'Email/Password sign-in provider is disabled. Please enable "Email/Password" in Firebase Console -> Authentication -> Sign-in method.';
      } else if (errCode === 'INVALID_EMAIL') {
        userFriendlyMessage = 'The email address format is invalid.';
      } else if (errCode === 'API_KEY_INVALID' || errCode === 'INVALID_KEY') {
        userFriendlyMessage =
          'Invalid Firebase API Key. Please verify NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.';
      } else if (errCode) {
        userFriendlyMessage = `Firebase error: ${errCode}`;
      }

      return NextResponse.json(
        { success: false, message: userFriendlyMessage, details: data?.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent successfully! Please check your email inbox (and spam folder).',
    });
  } catch (error: any) {
    console.error('[Forgot Password] Server exception:', error);
    return NextResponse.json(
      { success: false, message: 'Server error while sending password reset email.' },
      { status: 500 }
    );
  }
}
