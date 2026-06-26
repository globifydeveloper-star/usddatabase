import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'generated_missing_earnings',
  pk: ["id"],
  columns: ["unitid","school_name","cip_code","cip_title","credential_level","credential_title","grad_cohort","year_1","year_1_status","year_5","year_5_status","year_10","year_10_status","missing_columns","year_1_final","year_1_method","year_5_final","year_5_method","year_10_final","year_10_method","ratio_source"],
  searchColumns: ["school_name","cip_code","cip_title","credential_title","grad_cohort","year_1_status","year_5_status","year_10_status","missing_columns","year_1_method","year_5_method","year_10_method","ratio_source"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: "",
  autoUpdatedAt: false,
};
