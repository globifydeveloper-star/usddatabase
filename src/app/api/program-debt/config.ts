import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'program_debt',
  pk: ["id"],
  columns: ["program_id","loan_type","group_type","institution_scope","borrower_count","median_debt","average_debt","median_payment"],
  searchColumns: ["loan_type","group_type","institution_scope"],
  joins: "LEFT JOIN programs p ON p.id = t.program_id",
  selectExtra: ", p.title AS program_title, p.school_name AS school_name",
  autoUpdatedAt: true,
};
