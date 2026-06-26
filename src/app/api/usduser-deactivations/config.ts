import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usduser_deactivations',
  pk: ["id"],
  columns: ["id","user_id","reason_code","reason_label","other_reason","improvement_feedback","acknowledged"],
  searchColumns: ["reason_code","reason_label","other_reason","improvement_feedback"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
};
