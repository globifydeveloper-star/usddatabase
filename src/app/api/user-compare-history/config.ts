import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'user_compare_history',
  pk: ["id"],
  columns: ["user_id","compared_colleges"],
  searchColumns: [],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
};
