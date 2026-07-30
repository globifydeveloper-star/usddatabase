import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';
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
        u.id,
        u.full_name,
        u.email,
        u.is_active,
        u.created_at,
        u.role_id,
        r.role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.full_name ILIKE $1
      ORDER BY u.id DESC
      LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*) 
      FROM users
      WHERE full_name ILIKE $1
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
        console.error('Users API Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
export async function POST(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'users' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const { full_name, email, role_id, is_active, password } = body;
        const passwordHash = await bcrypt.hash(password, 10);

        //Check if email already exists
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

        if (existing.rowCount && existing.rowCount > 0) {
            return NextResponse.json(
                { success: false, message: 'Email already exists' },
                { status: 400 }
            );
        }

        //Insert new user
        const insertQuery = `
  INSERT INTO users (
    full_name,
    email,
    password_hash,
    role_id,
    is_active,
    created_at
  )
  VALUES ($1,$2,$3,$4,$5,NOW())
  RETURNING *
`;
        const result = await pool.query(insertQuery, [
            full_name,
            email,
            passwordHash,
            role_id,
            is_active ?? true,
        ]);

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create User Error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'User creation failed',
            },
            { status: 500 }
        );
    }
}
