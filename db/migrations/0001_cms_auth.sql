-- CMS auth: users + per-editor table write permissions.
-- Apply manually (no migration runner in this repo) — e.g. via the Supabase
-- SQL editor or `psql -f db/migrations/0001_cms_auth.sql`.

CREATE TYPE cms_user_role AS ENUM ('superadmin', 'editor', 'viewer');

CREATE TABLE cms_users (
  id             BIGSERIAL PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  role           cms_user_role NOT NULL DEFAULT 'viewer',
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cms_editor_table_permissions (
  id              BIGSERIAL PRIMARY KEY,
  editor_user_id  BIGINT NOT NULL REFERENCES cms_users(id) ON DELETE CASCADE,
  table_name      TEXT NOT NULL,
  granted_by      BIGINT NOT NULL REFERENCES cms_users(id) ON DELETE RESTRICT,
  granted_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (editor_user_id, table_name)
);

CREATE INDEX idx_cms_editor_table_permissions_editor
  ON cms_editor_table_permissions (editor_user_id);
