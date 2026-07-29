import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usdreports',
  pk: ["id"],
  columns: ["report_reference_id","user_id","pdf_storage_path","mime_type"],
  searchColumns: ["report_reference_id"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
  listColumns: ["id","report_reference_id","user_id","created_at","pdf_storage_path","pdf_size","mime_type"],
};
