export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  is_active: boolean | null;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}