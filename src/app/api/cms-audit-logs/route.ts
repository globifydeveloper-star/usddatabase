import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * limit;

  try {
    const where = `WHERE email ILIKE $1 OR table_name ILIKE $1 OR action ILIKE $1`;

    const dataResult = await pool.query(
      `SELECT id, email, table_name, action, record_id, changed_permissions::text AS changed_permissions, created_at
       FROM cms_audit_logs
       ${where}
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM cms_audit_logs ${where}`,
      [`%${search}%`]
    );

    return NextResponse.json({
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
    });
  } catch (error) {
    console.error('GET cms_audit_logs Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
