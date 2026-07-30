import 'server-only';
import { pool } from './db';
import type { AuthContext } from './auth';

export type AuditAction = 'create' | 'update' | 'delete' | 'permission_change' | 'force_logout';

// Best-effort — a logging failure must never fail the request that
// triggered it, so errors are swallowed after being logged to the server console.
export async function logAudit(
  auth: AuthContext,
  entry: {
    table_name: string;
    action: AuditAction;
    record_id?: string | number | null;
    changed_permissions?: unknown;
  }
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO cms_audit_logs (user_id, email, table_name, action, record_id, changed_permissions)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        auth.userId,
        auth.email,
        entry.table_name,
        entry.action,
        entry.record_id != null ? String(entry.record_id) : null,
        entry.changed_permissions != null ? JSON.stringify(entry.changed_permissions) : null,
      ]
    );
  } catch (error) {
    console.error('logAudit Error:', error);
  }
}
