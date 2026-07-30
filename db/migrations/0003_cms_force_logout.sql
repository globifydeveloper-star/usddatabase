-- Adds the column that backs "force logout": any JWT issued before this
-- timestamp is rejected on the user's next API call. Apply manually —
-- e.g. `psql -f db/migrations/0003_cms_force_logout.sql`.

ALTER TABLE cms_users ADD COLUMN IF NOT EXISTS force_logout_after TIMESTAMPTZ;
