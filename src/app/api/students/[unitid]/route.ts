import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';
{/* UPDATE Student  */}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'students' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = await params;
        const body = await request.json();

       const result = await pool.query(
  `
  UPDATE students
  SET
    size = $1,
    grad_students = $2,
    enrollment_grad_12_month = $3,
    enrollment_undergrad_12_month = $4,
    fafsa_applications = $5,
    demographics_men = $6,
    demographics_women = $7,
    faculty_men = $8,
    faculty_women = $9,
    student_faculty_ratio = $10
  WHERE unitid = $11
  RETURNING *;
  `,
  [
    body.size,
    body.grad_students,
    body.enrollment_grad_12_month,
    body.enrollment_undergrad_12_month,
    body.fafsa_applications,
    body.demographics_men,
    body.demographics_women,
    body.faculty_men,
    body.faculty_women,
    body.student_faculty_ratio,
    unitid
  ]
);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Student updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Student Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

/*  DELETE Student  */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'students' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { unitid } = await params;

    const result = await pool.query(
      `DELETE FROM students WHERE unitid = $1 RETURNING *`,
      [unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('DELETE Student Error:', error);

    return NextResponse.json(
      { success: false, message: 'Delete failed' },
      { status: 500 }
    );
  }
}