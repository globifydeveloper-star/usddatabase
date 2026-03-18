import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 20);
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    try {
        const dataQuery = `
  SELECT unitid, yr1_overall, yr1_completers,
         yr1_noncompleters, yr3_completers,
         yr3_noncompleters, yr3_overall
  FROM repayment
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

        const countQuery = `
      SELECT COUNT(*) FROM repayment
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
    try {
        const body = await request.json();

        const {
            unitid,
            yr1_overall,
            yr1_completers,
            yr1_noncompleters,
            yr3_completers,
            yr3_noncompleters,
            yr3_overall,
        } = body;

        /* ---------- SCHOOL EXIST CHECK ---------- */

        const schoolCheck = await pool.query(`SELECT unitid FROM schools WHERE unitid = $1`, [
            unitid,
        ]);

        /* ---------- DUPLICATE CHECK ---------- */

        const repaymentCheck = await pool.query(`SELECT unitid FROM repayment WHERE unitid = $1`, [
            unitid,
        ]);

        if (repaymentCheck.rowCount !== 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Repayment data already exists for this Unit ID',
                },
                { status: 400 }
            );
        }

        /* ---------- INSERT ---------- */

        const insertQuery = `
      INSERT INTO repayment (
        unitid,
        yr1_overall,
        yr1_completers,
        yr1_noncompleters,
        yr3_completers,
        yr3_noncompleters,
        yr3_overall
      )
      
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            yr1_overall,
            yr1_completers,
            yr1_noncompleters,
            yr3_completers,
            yr3_noncompleters,
            yr3_overall,
        ]);

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create Repayment Error:', error);

        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
