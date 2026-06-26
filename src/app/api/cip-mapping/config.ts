import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'cip_mapping',
  pk: ["cip_prefix"],
  columns: ["cip_prefix","field_name"],
  searchColumns: ["cip_prefix","field_name"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
