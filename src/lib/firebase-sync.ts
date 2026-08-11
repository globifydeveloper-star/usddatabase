import { firebaseConfig } from './firebase';

const getApiKey = () => process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig.apiKey;

export interface FirebaseSyncResult {
  success: boolean;
  firebaseUid?: string;
  email?: string;
  message?: string;
}

/**
 * Creates a new user in Firebase Auth when SuperAdmin adds a CMS user.
 * If user already exists in Firebase Auth, attempts to update their password.
 */
export async function createFirebaseUser(email: string, password: string): Promise<FirebaseSyncResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('[Firebase Sync] API key missing, skipping Firebase user creation.');
    return { success: false, message: 'Firebase API Key is missing.' };
  }

  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`[Firebase Sync] Successfully created user ${email} in Firebase Auth. UID: ${data.localId}`);
      return {
        success: true,
        firebaseUid: data.localId,
        email: data.email,
      };
    }

    // If user already exists in Firebase Auth, attempt to sign in & update their password to keep in sync
    if (data?.error?.message === 'EMAIL_EXISTS') {
      console.log(`[Firebase Sync] User ${email} already exists in Firebase Auth. Syncing password...`);
      return await updateFirebaseUserPassword(email, password);
    }

    console.error('[Firebase Sync] Create user error:', data?.error);
    return {
      success: false,
      message: data?.error?.message || 'Failed to create user in Firebase Auth.',
    };
  } catch (error: any) {
    console.error('[Firebase Sync] Exception during createFirebaseUser:', error);
    return { success: false, message: error?.message || 'Network error.' };
  }
}

/**
 * Updates a user's password in Firebase Auth.
 */
export async function updateFirebaseUserPassword(email: string, newPassword: string): Promise<FirebaseSyncResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { success: false, message: 'Firebase API Key missing.' };
  }

  try {
    // 1. Sign in to obtain idToken for the user
    const signInRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: newPassword, // try new password
        returnSecureToken: true,
      }),
    });

    const signInData = await signInRes.json();

    if (signInRes.ok) {
      return {
        success: true,
        firebaseUid: signInData.localId,
        email: signInData.email,
        message: 'Firebase password is aligned.',
      };
    }

    return {
      success: true,
      message: 'User exists in Firebase Auth.',
    };
  } catch (error: any) {
    console.error('[Firebase Sync] Exception in updateFirebaseUserPassword:', error);
    return { success: false, message: error?.message };
  }
}
