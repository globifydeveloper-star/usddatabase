import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

/* UPDATE ADMISSION  */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  try {
    const { unitid } = await params;
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE admissions
      SET
        test_requirements = $1,
        admission_rate = $2
      WHERE unitid = $3
      RETURNING *;
      `,
      [body.test_requirements, body.admission_rate, unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Admission data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admission updated successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('PUT admissions Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}


/*  DELETE ADMISSION  */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  try {
    const { unitid } = await params;

    const result = await pool.query(
      `DELETE FROM admissions WHERE unitid = $1 RETURNING *`,
      [unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Admission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admission deleted successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('DELETE admissions Error:', error);

    return NextResponse.json(
      { success: false, message: 'Delete failed' },
      { status: 500 }
    );
  }
}

