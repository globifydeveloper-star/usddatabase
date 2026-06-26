import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'school_descriptions',
  pk: ["unitid"],
  columns: ["unitid","name","city","state","school_url","school_descriptions"],
  searchColumns: ["unitid","name","city","state","school_url","school_descriptions"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
