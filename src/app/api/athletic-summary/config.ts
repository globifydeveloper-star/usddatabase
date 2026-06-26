import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'athletic_summary',
  pk: ["unitid","survey_year","division"],
  columns: ["unitid","survey_year","division","athletic_aid_total","athletes_total","avg_aid_per_athlete","recruiting_expense","athletic_revenue","athletic_expense"],
  searchColumns: ["survey_year","division","athletic_aid_total","athletes_total","avg_aid_per_athlete","recruiting_expense","athletic_revenue","athletic_expense"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: ", s.name AS school_name",
  autoUpdatedAt: false,
};
