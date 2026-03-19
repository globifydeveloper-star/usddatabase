import 'server-only'
import { Pool } from 'pg'

declare global {
  var pgPool: Pool | undefined
}

export const pool =
  global.pgPool ||
  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'us_degree',
    // password: 'your_password',
    port: 5432,
  })

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool
}