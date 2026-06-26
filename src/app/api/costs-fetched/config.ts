import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'costs_fetched',
  pk: ["unitid"],
  columns: ["unitid","booksupply","tuition_in_state","tuition_out_state","tuition_program_year","roomboard_oncampus","roomboard_offcampus","avg_net_price_public","avg_net_price_private","avg_net_price_overall","otherexpense_oncampus","otherexpense_offcampus","otherexpense_withfamily","sticker_price"],
  searchColumns: [],
  joins: "LEFT JOIN schools s ON s.unitid::text = t.unitid::text",
  selectExtra: ", s.name AS school_name",
  autoUpdatedAt: false,
};
