
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
  SELECT unitid, size, grad_students,
         fafsa_applications, demographics_men,
         demographics_women, faculty_men, faculty_women,
         enrollment_grad_12_month, enrollment_undergrad_12_month,
         student_faculty_ratio
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
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'students' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

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
      student_faculty_ratio
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
        faculty_women,
        student_faculty_ratio
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
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
      student_faculty_ratio
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