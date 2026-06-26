import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'program_descriptions',
  pk: ["id"],
  columns: ["unitid","cip_code","title","credential_title","school_name","program_description"],
  searchColumns: ["cip_code","title","credential_title","school_name","program_description"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: "",
  autoUpdatedAt: false,
};
