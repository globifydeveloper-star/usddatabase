export interface Authentication {
  id: number|null;
  full_name: string|null;
  email: string|null;
  password_hash: string|null;
  role_name: string|null;
  is_active: boolean|null;
  last_login: string|null;
  table_name: string|null;
  can_read: boolean|null;
  can_edit: boolean|null;
  can_delete: boolean|null;
  created_at: string|null;
  updated_at: string|null;
}
