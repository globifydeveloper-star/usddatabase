import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'user_saved_programs',
  pk: ["id"],
  columns: ["user_id","program_id"],
  searchColumns: [],
  joins: "LEFT JOIN programs p ON p.id = t.program_id LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", p.title AS program_title, p.school_name AS school_name, u.display_name AS user_name",
  autoUpdatedAt: false,
};
