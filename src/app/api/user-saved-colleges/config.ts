import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'user_saved_colleges',
  pk: ["id"],
  columns: ["user_id","unitid"],
  searchColumns: [],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", s.name AS school_name, u.display_name AS user_name",
  autoUpdatedAt: false,
};
