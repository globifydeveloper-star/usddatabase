// Client-side-only heuristic for deriving a DB table name from a CrudConfig's
// apiEndpoint, used purely to decide whether to show write buttons. The
// real, security-relevant table name always comes from each route's own
// literal `cfg.table` in crud.ts — a mismatch here can only mis-render a
// button, never bypass a permission.
export function deriveTableName(apiEndpoint: string): string {
  return apiEndpoint.replace(/^\/api\//, '').replace(/-/g, '_');
}
