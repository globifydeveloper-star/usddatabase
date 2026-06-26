export interface AuditLogs {
  id: number|null;
  table_name: string|null;
  row_id: number|null;
  action: string|null;
  changed_by: number|null;
  changed_at: string|null;
  user_type: string|null;
  user_id: number|null;
  // joined display fields
  user_name?: string | null;
}
