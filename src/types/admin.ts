export interface Admin {
  id: number|null;
  full_name: string|null;
  email: string|null;
  password_hash: string|null;
  role: string|null;
  is_active: boolean|null;
  created_at: string|null;
  updated_at: string|null;
}
