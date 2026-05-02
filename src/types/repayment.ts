export interface Repayment {
  unitid: string;
  yr1_completers: number | null;
  yr1_noncompleters: number | null;
  yr1_overall: number | null;
  yr3_completers: number | null;
  yr3_noncompleters: number | null;
  all_borrowers_3yr: number | null;
  graduates_3yr: number | null;
  non_completers_3yr: number | null;
  repayment_success: number | null;
  yr3_overall: number | null;
}