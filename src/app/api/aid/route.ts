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
  SELECT unitid, loan_principal, pell_grant_rate, federal_loan_rate, students_with_any_loan
  FROM aid
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

        const countQuery = `
  SELECT COUNT(*) FROM aid
  WHERE unitid::text ILIKE $1
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
  if (!(await assertTableWritable({ table: 'aid' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const {
            unitid,
            loan_principal,
            pell_grant_rate,
            federal_loan_rate,
            students_with_any_loan,
        } = body;

        /* ---------- SCHOOL EXIST CHECK ---------- */

        const schoolCheck = await pool.query(`SELECT unitid FROM schools WHERE unitid = $1`, [
            unitid,
        ]);

        /* ---------- DUPLICATE CHECK ---------- */

        const aidCheck = await pool.query(`SELECT unitid FROM aid WHERE unitid = $1`, [unitid]);

        if (aidCheck.rowCount !== 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Aid data already exists for this Unit ID',
                },
                { status: 400 }
            );
        }

        /* ---------- INSERT ---------- */

        const insertQuery = `
      INSERT INTO aid (
        unitid,
        loan_principal,
        pell_grant_rate,
        federal_loan_rate,
        students_with_any_loan
      )
      
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            loan_principal,
            pell_grant_rate,
            federal_loan_rate,
            students_with_any_loan,
        ]);

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create Aid Error:', error);

        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
