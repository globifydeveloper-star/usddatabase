// One-off bootstrap script: creates the first superadmin cms_users account.
// Usage: node scripts/create-superadmin.js you@example.com 'StrongPassw0rd!'
// (No self-registration exists by design — only a superadmin can create
// users via the cms-users UI, so the very first one must be seeded directly.)

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

async function main() {
  const [, , email, password] = process.argv;
  if (!email || !password) {
    console.error('Usage: node scripts/create-superadmin.js <email> <password>');
    process.exit(1);
  }

  const env = loadEnvLocal();
  const pool = env.DATABASE_URL
    ? new Pool({ connectionString: env.DATABASE_URL, ssl: { rejectUnauthorized: env.DB_SSL_REJECT_UNAUTHORIZED === 'true' } })
    : new Pool({
        host: env.DB_HOST,
        port: Number(env.DB_PORT) || 5432,
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        ssl: { rejectUnauthorized: env.DB_SSL_REJECT_UNAUTHORIZED === 'true' },
      });

  try {
    const existing = await pool.query('SELECT id FROM cms_users WHERE email = $1', [email]);
    if (existing.rowCount > 0) {
      console.error(`A cms_users account with email "${email}" already exists.`);
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO cms_users (email, password_hash, role, is_active)
       VALUES ($1, $2, 'superadmin', true)
       RETURNING id, email, role, is_active, created_at`,
      [email, passwordHash]
    );

    console.log('Created superadmin:', result.rows[0]);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Failed to create superadmin:', err.message);
  process.exit(1);
});
