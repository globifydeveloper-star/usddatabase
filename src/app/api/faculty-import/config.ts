import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'faculty_import',
  pk: ["id"],
  columns: ["id","faculty_men","faculty_women"],
  searchColumns: [],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
