import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'athletic_content_blocks',
  pk: ["id"],
  columns: ["key","title","content"],
  searchColumns: ["key","title","content"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
