import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'athletic_division_benchmarks',
  pk: ["division","survey_year"],
  columns: ["division","survey_year","avg_athletes_total","avg_aid_per_athlete","avg_recruiting_expense","avg_revenue","avg_expense"],
  searchColumns: ["division","survey_year"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: true,
};
