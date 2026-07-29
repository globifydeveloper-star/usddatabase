import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'staging_admissions_categories',
  pk: ["unitid"],
  columns: ["unitid","sat_disclosure_category","publish_publicly","review_status"],
  searchColumns: ["sat_disclosure_category","review_status"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: ", s.name AS school_name",
  autoUpdatedAt: false,
};
