export interface UserSavedPrograms {
  id: number|null;
  user_id: number|null;
  program_id: number|null;
  created_at: string|null;
  // joined display fields
  program_title?: string | null;
  school_name?: string | null;
  user_name?: string | null;
}
