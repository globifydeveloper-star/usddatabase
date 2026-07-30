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

export function getAuthContext(request: Request): AuthContext | null {
  const userId = request.headers.get('x-cms-user-id');
  const email = request.headers.get('x-cms-email');
  const role = request.headers.get('x-cms-role') as CmsRole | null;
  if (!userId || !email || !role) return null;
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
