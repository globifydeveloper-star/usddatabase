-- Replaces timestamp-based force logout (force_logout_after) with session
-- versioning. Every JWT embeds the session_version it was issued under;
-- bumping the column invalidates all previously issued tokens for that user
-- without needing to compare timestamps. Apply manually —
-- e.g. `psql -f db/migrations/0004_cms_session_version.sql`.

ALTER TABLE cms_users ADD COLUMN IF NOT EXISTS session_version INTEGER NOT NULL DEFAULT 1;
ALTER TABLE cms_users DROP COLUMN IF EXISTS force_logout_after;

-- Records the session_version a login was issued under, so
-- /api/auth/active-users can tell a still-valid session apart from one that
-- has since been force-logged-out (previously done via a login_at /
-- force_logout_after timestamp comparison).
ALTER TABLE cms_login_history ADD COLUMN IF NOT EXISTS session_version INTEGER;
