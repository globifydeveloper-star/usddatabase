import 'server-only';
import { pool } from './db';
import type { CmsRole } from './jwt';

// Reads back the identity middleware.ts already verified and attached as
// request headers — never re-verifies the JWT itself.

export interface AuthContext {
  userId: number;
  email: string;
  role: CmsRole;
}

// Force logout: a superadmin can set cms_users.force_logout_after to
// invalidate a user's existing sessions. Since JWTs are otherwise stateless
// and verified without a DB hit in middleware.ts, that revocation is
// enforced here instead — the first DB-backed checkpoint every API request
// passes through — by rejecting any token issued before that timestamp.
export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  const userId = request.headers.get('x-cms-user-id');
  const email = request.headers.get('x-cms-email');
  const role = request.headers.get('x-cms-role') as CmsRole | null;
  const issuedAt = request.headers.get('x-cms-issued-at');
  if (!userId || !email || !role) return null;

  if (issuedAt) {
    const { rows } = await pool.query('SELECT force_logout_after FROM cms_users WHERE id = $1', [
      Number(userId),
    ]);
    const forceLogoutAfter = rows[0]?.force_logout_after as string | null | undefined;
    if (forceLogoutAfter && new Date(Number(issuedAt) * 1000) < new Date(forceLogoutAfter)) {
      return null;
    }
  }

  return { userId: Number(userId), email, role };
}

export async function assertTableWritable(
  cfg: { table: string },
  auth: AuthContext
): Promise<boolean> {
  if (auth.role === 'superadmin') return true;
  if (auth.role === 'viewer') return false;

  const result = await pool.query(
    'SELECT 1 FROM cms_editor_table_permissions WHERE editor_user_id = $1 AND table_name = $2',
    [auth.userId, cfg.table]
  );
  return (result.rowCount ?? 0) > 0;
}
