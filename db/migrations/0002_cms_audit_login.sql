-- CMS login history + audit logs. Apply manually (no migration runner) --
-- e.g. via the Supabase SQL editor or `psql -f db/migrations/0002_cms_audit_login.sql`.

-- One row per login, updated with logout_at/session duration on logout.
CREATE TABLE cms_login_history (
  id                        BIGSERIAL PRIMARY KEY,
  user_id                   BIGINT REFERENCES cms_users(id) ON DELETE SET NULL,
  email                     TEXT NOT NULL,
  role                      cms_user_role NOT NULL,
  login_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  logout_at                 TIMESTAMPTZ,
  session_duration_seconds  INTEGER,
  device                    TEXT,
  ip_address                TEXT
);

CREATE INDEX idx_cms_login_history_user ON cms_login_history (user_id);
CREATE INDEX idx_cms_login_history_login_at ON cms_login_history (login_at DESC);

-- One row per mutating action (create/update/delete/permission_change) taken
-- by a CMS user. email is denormalized so the trail survives user deletion.
CREATE TABLE cms_audit_logs (
  id                    BIGSERIAL PRIMARY KEY,
  user_id               BIGINT REFERENCES cms_users(id) ON DELETE SET NULL,
  email                 TEXT NOT NULL,
  table_name            TEXT NOT NULL,
  action                TEXT NOT NULL,
  record_id             TEXT,
  changed_permissions   JSONB,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cms_audit_logs_created_at ON cms_audit_logs (created_at DESC);
CREATE INDEX idx_cms_audit_logs_user ON cms_audit_logs (user_id);
