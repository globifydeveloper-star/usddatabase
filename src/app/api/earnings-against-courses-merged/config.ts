import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'earnings_against_courses_merged',
  pk: ["id"],
  columns: ["unitid","ope8_id","school_name","cip_title","grad_cohort","year_1","year_5","year_10","cip_code","credential_level","credential_title","avg_salary","growth_rate","year_1_method","year_5_method","year_10_method"],
  searchColumns: ["school_name","cip_title","cip_code","credential_title","ope8_id"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
