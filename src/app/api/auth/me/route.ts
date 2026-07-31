import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }

  let permittedTables: string[] | null = null;
  if (auth.role !== 'superadmin' && auth.role !== 'viewer') {
    const result = await pool.query(
      'SELECT table_name FROM cms_editor_table_permissions WHERE editor_user_id = $1',
      [auth.userId]
    );
    permittedTables = result.rows.map((row) => row.table_name);
  }

  return NextResponse.json({
    userId: auth.userId,
    email: auth.email,
    role: auth.role,
    permittedTables,
  });
}
