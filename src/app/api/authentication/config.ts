import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'authentication',
  pk: ["id"],
  columns: ["full_name","email","password_hash","role_name","is_active","last_login","table_name","can_read","can_edit","can_delete"],
  searchColumns: ["full_name","email","role_name","table_name"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: true,
  listColumns: ["id","full_name","email","role_name","is_active","last_login","table_name","can_read","can_edit","can_delete"],
};
