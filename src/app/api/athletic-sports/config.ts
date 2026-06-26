import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'athletic_sports',
  pk: ["unitid","sport","gender","division","survey_year"],
  columns: ["unitid","sport","gender","roster_size","division","survey_year"],
  searchColumns: ["sport","gender","division","survey_year"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: ", s.name AS school_name",
  autoUpdatedAt: false,
};
