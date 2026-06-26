import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'admin',
  pk: ["id"],
  columns: ["full_name","email","password_hash","role","is_active"],
  searchColumns: ["full_name","email","role"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: true,
};
