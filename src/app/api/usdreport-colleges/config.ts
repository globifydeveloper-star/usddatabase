import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usdreport_colleges',
  pk: ["id"],
  columns: ["report_id","unitid","display_order","cip_code","program_name"],
  searchColumns: ["cip_code","program_name"],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text LEFT JOIN usdreports r ON r.id = t.report_id",
  selectExtra: ", s.name AS school_name, r.report_reference_id AS report_reference_id",
  autoUpdatedAt: false,
};
