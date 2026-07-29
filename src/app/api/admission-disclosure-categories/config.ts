import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'admission_disclosure_categories',
  pk: ["category"],
  columns: ["category","badge_label","badge_color","supporting_copy","disclaimer_tier","disclaimer_text","show_admission_rate_required"],
  searchColumns: ["category","badge_label","supporting_copy"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
