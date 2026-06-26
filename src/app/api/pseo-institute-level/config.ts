import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'pseo_institute_level',
  pk: ["id"],
  columns: ["pseo_entity_id","cip_code","cip_title","grad_cohort","year_after_completion","median_earnings","cip_code_clean"],
  searchColumns: ["cip_code","cip_title","grad_cohort","cip_code_clean"],
  joins: "LEFT JOIN pseo_entities pe ON pe.id = t.pseo_entity_id",
  selectExtra: ", pe.entity_name AS entity_name",
  autoUpdatedAt: false,
};
