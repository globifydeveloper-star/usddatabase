import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usduser_preferred_states',
  pk: ["id"],
  columns: ["id","user_id","state_code"],
  searchColumns: ["state_code"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id LEFT JOIN states st ON st.state_code = t.state_code",
  selectExtra: ", u.display_name AS user_name, st.state_title AS state_title",
  autoUpdatedAt: false,
};
