import { SignJWT, jwtVerify } from 'jose';

// Node- and Edge-runtime safe (uses Web Crypto via `jose`) so this can be
// imported from both middleware.ts (Edge) and regular API routes (Node).

export const AUTH_COOKIE_NAME = 'cms_session';

// 'superadmin' | 'editor' | 'viewer' are the three built-in roles with
// special-cased behavior throughout the app; any other value is a custom
// role (see the `roles` table) whose access is governed entirely by
// cms_editor_table_permissions, same as 'editor'.
export type CmsRole = string;

export interface AuthTokenPayload {
  userId: number;
  email: string;
  role: CmsRole;
  sessionVersion: number;
  /** Seconds-since-epoch the token was issued — only present on verified tokens. */
  iat?: number;
}

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(
  payload: AuthTokenPayload,
  expiresIn: string = '8h'
): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    sessionVersion: payload.sessionVersion,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey());
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] });
    const { userId, email, role, sessionVersion, iat } = payload as Record<string, unknown>;
    if (
      typeof userId !== 'number' ||
      typeof email !== 'string' ||
      typeof role !== 'string' ||
      !role ||
      typeof sessionVersion !== 'number'
    ) {
      return null;
    }
    return { userId, email, role, sessionVersion, iat: typeof iat === 'number' ? iat : undefined };
  } catch {
    return null;
  }
}
