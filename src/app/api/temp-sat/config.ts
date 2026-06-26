import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'temp_sat',
  pk: ["unitid"],
  columns: ["unitid","sat_avg_overall","sat_mid_math","sat_mid_reading","sat_p25_reading","sat_p25_math","sat_p25_writing","sat_p75_reading","sat_p75_math","sat_p75_writing"],
  searchColumns: [],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: ", s.name AS school_name",
  autoUpdatedAt: false,
};
