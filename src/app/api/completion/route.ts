
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
  SELECT unitid, completed_2yrs, completed_3yrs,
         completed_4yrs, completed_6yrs, emp_factor, completion_rate
  FROM completion
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

const countQuery = `
  SELECT COUNT(*) FROM completion
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
      completed_2yrs,
      completed_3yrs,
      completed_4yrs,
      completed_6yrs,
      emp_factor,
      completion_rate
    } = body;

    /* ---------- SCHOOL EXIST CHECK ---------- */

    const schoolCheck = await pool.query(
      `SELECT unitid FROM schools WHERE unitid = $1`,
      [unitid]
    );

    /* ---------- DUPLICATE CHECK ---------- */

    const completionCheck = await pool.query(
      `SELECT unitid FROM completion WHERE unitid = $1`,
      [unitid]
    );

    if (completionCheck.rowCount !== 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Completion data already exists for this Unit ID",
        },
        { status: 400 }
      );
    }

    /* ---------- INSERT ---------- */

    const insertQuery = `
      INSERT INTO completion (
        unitid,
        completed_2yrs,
        completed_3yrs,
        completed_4yrs,
        completed_6yrs,
        emp_factor,
        completion_rate
      )
      
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      unitid,
      completed_2yrs,
      completed_3yrs,
      completed_4yrs,
      completed_6yrs,
      emp_factor,
      completion_rate,
    ]);
      

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Create Completion Error:", error);

    return NextResponse.json(
      { success: false, message: "Insert failed" },
      { status: 500 }
    );
  }
}