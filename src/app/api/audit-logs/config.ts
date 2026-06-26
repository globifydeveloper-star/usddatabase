import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'audit_logs',
  pk: ["id"],
  columns: ["table_name","row_id","action","changed_by","changed_at","user_type","user_id"],
  searchColumns: ["table_name","action","user_type"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
};
