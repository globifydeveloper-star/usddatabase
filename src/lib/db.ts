import 'server-only'
import { Pool } from 'pg'

declare global {
  var pgPool: Pool | undefined
}

// Prefer a single connection string (e.g. Supabase pooler) when provided,
// otherwise fall back to discrete DB_* env vars.
export const pool =
  global.pgPool ||
  (process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      })
    : new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false },
      }))

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool
}
