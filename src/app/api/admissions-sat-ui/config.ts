import { CrudTableConfig } from '@/lib/crud';

// admissions_sat_ui is a read-only Postgres VIEW (computed from admissions via
// COALESCE expressions), so only list is exposed — no create/update/delete.
export const cfg: CrudTableConfig = {
  table: 'admissions_sat_ui',
  pk: ["unitid"],
  columns: ["unitid","sat_rw_min","sat_rw_max","sat_math_min","sat_math_max"],
  searchColumns: ["unitid"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
