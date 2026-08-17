import 'server-only'
import { Pool } from 'pg'

declare global {
  var pgPool: Pool | undefined
}

const sslConfig = {
  rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
}

// Prefer a single connection string (e.g. Supabase pooler) when provided,
// otherwise fall back to discrete DB_* env vars.
export const pool =
  global.pgPool ||
  (process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: sslConfig,
      })
    : new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: sslConfig,
      }))

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool
}

let schemaEnsured = false
export async function ensureSessionSchema() {
  if (schemaEnsured) return
  try {
    await pool.query(
      'ALTER TABLE cms_login_history ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT now()'
    )
    schemaEnsured = true
  } catch (err) {
    console.warn('[DB] Schema check warning:', err)
  }
}

