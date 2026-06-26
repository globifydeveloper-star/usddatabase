export interface UserSavedColleges {
  id: number|null;
  user_id: number|null;
  unitid: number|null;
  created_at: string|null;
  // joined display fields
  school_name?: string | null;
  user_name?: string | null;
}
