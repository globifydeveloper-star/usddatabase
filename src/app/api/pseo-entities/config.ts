import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'pseo_entities',
  pk: ["id"],
  columns: ["entity_type","entity_code","entity_name"],
  searchColumns: ["entity_type","entity_code","entity_name"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
