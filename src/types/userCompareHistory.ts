export interface UserCompareHistory {
  id: number|null;
  user_id: number|null;
  compared_colleges: any;
  created_at: string|null;
  // joined display fields
  user_name?: string | null;
}
