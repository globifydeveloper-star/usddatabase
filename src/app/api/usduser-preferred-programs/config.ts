import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usduser_preferred_programs',
  pk: ["id"],
  columns: ["id","user_id","program"],
  searchColumns: ["program"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
};
