export interface CostsFetched {
  unitid: number|null;
  booksupply: number|null;
  tuition_in_state: number|null;
  tuition_out_state: number|null;
  tuition_program_year: number|null;
  roomboard_oncampus: number|null;
  roomboard_offcampus: number|null;
  avg_net_price_public: number|null;
  avg_net_price_private: number|null;
  avg_net_price_overall: number|null;
  otherexpense_oncampus: number|null;
  otherexpense_offcampus: number|null;
  otherexpense_withfamily: number|null;
  sticker_price: number|null;
  // joined display fields
  school_name?: string | null;
}
