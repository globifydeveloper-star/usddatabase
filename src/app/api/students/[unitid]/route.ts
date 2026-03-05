import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
    try {
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
    faculty_women = $9
  WHERE unitid = $10
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
    params.unitid
  ]
);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'data updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT admissions Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
