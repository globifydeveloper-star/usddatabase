import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (auth.role === 'editor') {
    const { rows } = await pool.query(
      'SELECT 1 FROM cms_editor_table_permissions WHERE editor_user_id = $1 AND table_name = $2 LIMIT 1',
      [auth.userId, 'login_history']
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  } else if (auth.role !== 'superadmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * limit;

  try {
    const where = `WHERE email ILIKE $1 OR role::text ILIKE $1 OR ip_address ILIKE $1`;

    const dataResult = await pool.query(
      `SELECT id, email, role, login_at, logout_at,
              CASE WHEN session_duration_seconds IS NULL THEN NULL
                   ELSE (session_duration_seconds / 60) || 'm ' || (session_duration_seconds % 60) || 's'
              END AS session_duration,
              device, ip_address
       FROM cms_login_history
       ${where}
       ORDER BY login_at DESC
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM cms_login_history ${where}`,
      [`%${search}%`]
    );

    return NextResponse.json({
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
    });
  } catch (error) {
    console.error('GET cms_login_history Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
