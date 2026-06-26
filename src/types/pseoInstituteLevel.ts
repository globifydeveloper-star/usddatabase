export interface PseoInstituteLevel {
  id: number|null;
  pseo_entity_id: number|null;
  cip_code: string|null;
  cip_title: string|null;
  grad_cohort: string|null;
  year_after_completion: number|null;
  median_earnings: number|null;
  cip_code_clean: string|null;
  // joined display fields
  entity_name?: string | null;
}
