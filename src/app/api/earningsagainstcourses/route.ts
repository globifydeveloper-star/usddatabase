import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 20);
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    try {
        const dataQuery = `
  SELECT id, unitid, ope8_id, school_name, cip_code, cip_title, grad_cohort,
         year_1, year_5, year_10, credential_level, credential_title, avg_salary
        
  FROM earnings_against_courses
  WHERE unitid::text ILIKE $1 OR school_name ILIKE $1
  LIMIT $2 OFFSET $3
`;

        const countQuery = `
  SELECT COUNT(*) FROM earnings_against_courses
  WHERE unitid::text ILIKE $1 OR school_name ILIKE $1
`;

        const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
        const countResult = await pool.query(countQuery, [`%${search}%`]);

        return NextResponse.json({
            data: dataResult.rows,
            total: Number(countResult.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
export async function POST(request: Request) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'earnings_against_courses' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const {
            unitid,
            ope8_id,
            school_name,
            cip_code,
            cip_title,
            grad_cohort,
            year_1,
            year_5,
            year_10,
            credential_level,
            credential_title,
            avg_salary,
        } = body;

        /* ---------- SCHOOL EXIST CHECK ---------- */

        const schoolCheck = await pool.query(`SELECT unitid FROM schools WHERE unitid = $1`, [
            unitid,
        ]);

        /* ---------- DUPLICATE CHECK ---------- */
        const EarningsCheck = await pool.query(
            `SELECT unitid FROM earnings_against_courses 
     WHERE unitid = $1 AND cip_code = $2 AND credential_level = $3`,
            [unitid, cip_code, credential_level]
        );

        if (EarningsCheck.rowCount !== 0) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Earnings data already exists for this Unit ID, CIP Code and Credential Level combination',
                },
                { status: 400 }
            );
        }

        /* ---------- INSERT ---------- */

        const insertQuery = `
      INSERT INTO earnings_against_courses (
        unitid,
        ope8_id,
        school_name,
        cip_code,
        cip_title,
        grad_cohort,
        year_1,
        year_5,
        year_10,
        credential_level,
        credential_title,
        avg_salary
      )
      
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            ope8_id,
            school_name,
            cip_code,
            cip_title,
            grad_cohort,
            year_1,
            year_5,
            year_10,
            credential_level,
            credential_title,
            avg_salary,
        ]);

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create Earnings Data Error:', error);

        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
