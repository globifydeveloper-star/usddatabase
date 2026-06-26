export interface ProgramDebt {
  id: number|null;
  program_id: number|null;
  loan_type: string|null;
  group_type: string|null;
  institution_scope: string|null;
  borrower_count: number|null;
  median_debt: number|null;
  average_debt: number|null;
  median_payment: number|null;
  created_at: string|null;
  updated_at: string|null;
  // joined display fields
  program_title?: string | null;
  school_name?: string | null;
}
