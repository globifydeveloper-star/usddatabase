import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from './db';
import type { CmsRole } from './jwt';

// Reads back the identity middleware.ts already verified and attached as
// request headers — never re-verifies the JWT itself.

export interface AuthContext {
  userId: number;
  email: string;
  role: CmsRole;
}

// Force logout: a superadmin can bump cms_users.session_version to
// invalidate a user's existing sessions. Since JWTs are otherwise stateless
// and verified without a DB hit in middleware.ts, that revocation is
// enforced here instead — the first DB-backed checkpoint every API request
// passes through — by rejecting any token whose embedded session_version no
// longer matches the row.
export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  const userId = request.headers.get('x-cms-user-id');
  const email = request.headers.get('x-cms-email');
  const role = request.headers.get('x-cms-role') as CmsRole | null;
  const sessionVersion = request.headers.get('x-cms-session-version');
  if (!userId || !email || !role || sessionVersion === null) return null;

  try {
    const { rows } = await pool.query(
      'SELECT role, is_active, session_version FROM cms_users WHERE id = $1',
      [Number(userId)]
    );
    if (rows.length === 0) return null;
    const user = rows[0];
    if (user.is_active === false) return null;
    if (Number(sessionVersion) !== Number(user.session_version)) return null;
  } catch (error) {
    console.error('getAuthContext DB check failed:', error);
    return null;
  }

  return { userId: Number(userId), email, role };
}

// Shared 401 response for the getAuthContext()-returned-null case, used by
// routes that also do a separate role check (which should fail with 403
// Forbidden instead — a valid session with insufficient permissions is a
// different condition than a session that's no longer valid).
export function sessionExpiredResponse() {
  return NextResponse.json({ success: false, message: 'Session expired' }, { status: 401 });
}

export async function assertTableWritable(
  cfg: { table: string },
  auth: AuthContext
): Promise<boolean> {
  if (auth.role === 'superadmin') return true;
  if (auth.role === 'viewer') return false;
  if (cfg.table === 'roles') return false;

  const result = await pool.query(
    'SELECT 1 FROM cms_editor_table_permissions WHERE editor_user_id = $1 AND table_name = $2',
    [auth.userId, cfg.table]
  );
  return (result.rowCount ?? 0) > 0;
}
