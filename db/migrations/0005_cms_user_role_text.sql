-- Custom CMS roles (created via Administration > Roles) are arbitrary
-- strings, not one of the three built-in values the cms_user_role enum was
-- created with — so inserting a user with a custom role (e.g. "manager")
-- fails with "invalid input value for enum cms_user_role". Roles are now
-- validated in the application layer (against the `roles` table plus the
-- three built-ins), so the DB column just needs to hold text. Apply
-- manually — e.g. `psql -f db/migrations/0005_cms_user_role_text.sql`.

ALTER TABLE cms_users ALTER COLUMN role TYPE TEXT USING role::TEXT;
ALTER TABLE cms_users ALTER COLUMN role SET DEFAULT 'viewer';

ALTER TABLE cms_login_history ALTER COLUMN role TYPE TEXT USING role::TEXT;

DROP TYPE cms_user_role;
