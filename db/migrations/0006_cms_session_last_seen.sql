-- Adds last_seen_at for live active session tracking. Apply manually —
-- e.g. `psql -f db/migrations/0006_cms_session_last_seen.sql` or via Supabase SQL Editor.

ALTER TABLE cms_login_history ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_cms_login_history_last_seen ON cms_login_history (last_seen_at DESC);

-- Backfill last_seen_at with login_at if null
UPDATE cms_login_history SET last_seen_at = login_at WHERE last_seen_at IS NULL;

-- Mark old stale logins (> 1 day old with logout_at IS NULL) as logged out
UPDATE cms_login_history
SET logout_at = COALESCE(last_seen_at, login_at),
    session_duration_seconds = EXTRACT(EPOCH FROM (COALESCE(last_seen_at, login_at) - login_at))::int
WHERE logout_at IS NULL AND login_at < NOW() - INTERVAL '1 day';
