import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'states',
  pk: ["id"],
  columns: ["state_code","state_title"],
  searchColumns: ["state_code","state_title"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
