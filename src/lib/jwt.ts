import { SignJWT, jwtVerify } from 'jose';

// Node- and Edge-runtime safe (uses Web Crypto via `jose`) so this can be
// imported from both middleware.ts (Edge) and regular API routes (Node).

export const AUTH_COOKIE_NAME = 'cms_session';

export type CmsRole = 'superadmin' | 'editor' | 'viewer';

export interface AuthTokenPayload {
  userId: number;
  email: string;
  role: CmsRole;
  /** Seconds-since-epoch the token was issued — only present on verified tokens. */
  iat?: number;
}

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT({ userId: payload.userId, email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secretKey());
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] });
    const { userId, email, role, iat } = payload as Record<string, unknown>;
    if (typeof userId !== 'number' || typeof email !== 'string' || typeof role !== 'string') {
      return null;
    }
    if (role !== 'superadmin' && role !== 'editor' && role !== 'viewer') return null;
    return { userId, email, role, iat: typeof iat === 'number' ? iat : undefined };
  } catch {
    return null;
  }
}
