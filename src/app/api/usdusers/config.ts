import { CrudTableConfig } from '@/lib/crud';

export const cfg: CrudTableConfig = {
  table: 'usdusers',
  pk: ["id"],
  columns: ["display_name","email","profile_image","auth_provider","role","email_verified","provider_user_id","last_login","password_hash","is_active","deactivated_at","firebase_uid","phone","address","gpa","sat_math","sat_reading_writing","act_score","graduation_year","high_school_name","preferred_degree_level"],
  searchColumns: ["display_name","email","profile_image","auth_provider","role","provider_user_id","firebase_uid","phone","address","high_school_name","preferred_degree_level"],
  joins: "",
  selectExtra: "",
  autoUpdatedAt: false,
};
