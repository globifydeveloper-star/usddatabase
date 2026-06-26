import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'pseo_state_level',
  pk: ["id"],
  columns: ["pseo_entity_id","cip_code","cip_title","grad_cohort","year_after_completion","median_earnings"],
  searchColumns: ["cip_code","cip_title","grad_cohort"],
  joins: "LEFT JOIN pseo_entities pe ON pe.id = t.pseo_entity_id",
  selectExtra: ", pe.entity_name AS entity_name",
  autoUpdatedAt: false,
};
