export interface UsduserDeactivations {
  id: number|null;
  user_id: number|null;
  reason_code: string|null;
  reason_label: string|null;
  other_reason: string|null;
  improvement_feedback: string|null;
  acknowledged: boolean|null;
  created_at: string|null;
  // joined display fields
  user_name?: string | null;
}
