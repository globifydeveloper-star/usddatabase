import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 10);
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    try {
        const dataQuery = `
      SELECT 
        id,
        role_name
      FROM roles
      WHERE role_name ILIKE $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*)
      FROM roles
      WHERE role_name ILIKE $1
    `;

        const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);

        const countResult = await pool.query(countQuery, [`%${search}%`]);

        return NextResponse.json({
            data: dataResult.rows,
            total: Number(countResult.rows[0].count),
            page,
            limit,
        });
    } catch (error) {
        console.error('Roles API Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'roles' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { role_name } = await request.json();

    await pool.query(
      `INSERT INTO roles (role_name) VALUES ($1)`,
      [role_name]
    );

    return NextResponse.json({ success: true });

  } catch (error: any) {

    // PostgreSQL duplicate key error
    if (error.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          message: "Role name already exists"
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
