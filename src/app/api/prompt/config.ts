import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'prompt',
  pk: ["unitid"],
  columns: ["unitid","cip_code","title","credential_title","school_name"],
  searchColumns: ["cip_code","title","credential_title","school_name"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: "",
  autoUpdatedAt: false,
};
