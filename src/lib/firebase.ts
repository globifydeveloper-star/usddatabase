export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'usdegreeadmin.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'usdegreeadmin',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'usdegreeadmin.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '169887196006',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export const auth = {
  config: firebaseConfig,
};

/**
 * Maps Firebase Auth error codes to user-friendly messages
 */
export function getFirebaseErrorMessage(error: any): string {
  const code =
    typeof error === 'string'
      ? error
      : error?.code || error?.message || '';

  switch (code) {
    case 'auth/invalid-email':
    case 'INVALID_EMAIL':
    case 'auth/INVALID_EMAIL':
      return 'Please enter a valid email address.';

    case 'auth/user-not-found':
    case 'EMAIL_NOT_FOUND':
    case 'auth/EMAIL_NOT_FOUND':
      return 'No registered user found with this email address.';

    case 'auth/too-many-requests':
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'Too many password reset attempts. Please wait a few minutes before trying again.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';

    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
    case 'API_KEY_INVALID':
    case 'INVALID_KEY':
      return 'Firebase API Key is missing or invalid in .env.local configuration.';

    case 'auth/operation-not-allowed':
    case 'OPERATION_NOT_ALLOWED':
      return 'Email/Password sign-in provider is disabled in your Firebase Console.';

    default:
      if (typeof code === 'string' && code.length > 0 && !code.startsWith('{')) {
        const cleanMsg = code.replace(/^auth\//i, '').replace(/_/g, ' ').replace(/-/g, ' ');
        return cleanMsg.charAt(0).toUpperCase() + cleanMsg.slice(1);
      }
      return 'An error occurred while sending the reset email. Please try again.';
  }
}

/**
 * Client SDK implementation of sendPasswordResetEmail
 */
export async function sendPasswordResetEmail(authObj: typeof auth, email: string): Promise<void> {
  const apiKey = authObj.config.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    const err = new Error('Firebase API Key is missing in .env.local (NEXT_PUBLIC_FIREBASE_API_KEY).');
    (err as any).code = 'auth/invalid-api-key';
    throw err;
  }

  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestType: 'PASSWORD_RESET',
      email,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const firebaseErrorCode = data?.error?.message || 'auth/unknown';
    const formattedCode = firebaseErrorCode.startsWith('auth/')
      ? firebaseErrorCode
      : `auth/${firebaseErrorCode.toLowerCase().replace(/_/g, '-')}`;
    
    const err = new Error(getFirebaseErrorMessage(formattedCode));
    (err as any).code = formattedCode;
    throw err;
  }
}

/**
 * Resets user password by sending request to backend forgot-password API
 */
export async function resetPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return {
        success: true,
        message: data.message || 'Password reset link sent successfully! Please check your email.',
      };
    }
    return {
      success: false,
      message: data.message || 'Failed to send password reset email.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Failed to send password reset email. Please try again.',
    };
  }
}

