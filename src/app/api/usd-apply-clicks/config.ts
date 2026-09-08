import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usd_apply_clicks',
  pk: ["id"],
  columns: ["user_id","university_id","university_name","cip_code","degree","credential_level","credential_title","school_url","clicked_at"],
  searchColumns: ["university_id","university_name","cip_code","degree","credential_title","school_url"],
  joins: "LEFT JOIN usdusers u ON u.id = t.user_id",
  selectExtra: ", u.display_name AS user_name",
  autoUpdatedAt: false,
};
