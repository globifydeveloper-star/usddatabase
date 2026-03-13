
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
  SELECT unitid, size, grad_students,
         fafsa_applications, demographics_men,
         demographics_women, faculty_men, faculty_women,
         enrollment_grad_12_month, enrollment_undergrad_12_month
  FROM students
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

const countQuery = `
  SELECT COUNT(*) FROM students
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
      size,
      grad_students,
      enrollment_grad_12_month,
      enrollment_undergrad_12_month,
      fafsa_applications,
      demographics_men,
      demographics_women,
      faculty_men,
      faculty_women,
    } = body;

    /* ---------- SCHOOL EXIST CHECK ---------- */

    const schoolCheck = await pool.query(
      `SELECT unitid FROM schools WHERE unitid = $1`,
      [unitid]
    );

    if (schoolCheck.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Unit ID not present in schools table",
        },
        { status: 400 }
      );
    }

    /* ---------- DUPLICATE CHECK ---------- */

    const studentCheck = await pool.query(
      `SELECT unitid FROM students WHERE unitid = $1`,
      [unitid]
    );

    if (studentCheck.rowCount !== 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Student already exists for this Unit ID",
        },
        { status: 400 }
      );
    }

    /* ---------- INSERT ---------- */

    const insertQuery = `
      INSERT INTO students (
        unitid,
        size,
        grad_students,
        enrollment_grad_12_month,
        enrollment_undergrad_12_month,
        fafsa_applications,
        demographics_men,
        demographics_women,
        faculty_men,
        faculty_women
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      unitid,
      size,
      grad_students,
      enrollment_grad_12_month,
      enrollment_undergrad_12_month,
      fafsa_applications,
      demographics_men,
      demographics_women,
      faculty_men,
      faculty_women,
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Create Student Error:", error);

    return NextResponse.json(
      { success: false, message: "Insert failed" },
      { status: 500 }
    );
  }
}