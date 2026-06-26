export interface AthleticSummary {
  unitid: number|null;
  survey_year: string|null;
  division: string|null;
  athletic_aid_total: string|null;
  athletes_total: string|null;
  avg_aid_per_athlete: string|null;
  recruiting_expense: string|null;
  athletic_revenue: string|null;
  athletic_expense: string|null;
  // joined display fields
  school_name?: string | null;
}
