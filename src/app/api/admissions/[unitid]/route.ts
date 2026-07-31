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
        admission_rate = $2,
        sat_avg_overall = $3,
        sat_mid_math = $4,
        sat_mid_reading = $5,
        sat_p25_reading = $6,
        sat_p25_math = $7,
        sat_p25_writing = $8,
        sat_p75_reading = $9,
        sat_p75_math = $10,
        sat_p75_writing= $11,
        sat_rw_min = $12,
        sat_rw_max = $13,
        sat_math_min = $14,
        sat_math_max = $15,
        sat_min_and_max_value = $16
      WHERE unitid = $17
      RETURNING *;
      `,
      [
        body.test_requirements,
        body.admission_rate,
        body.sat_avg_overall,
        body.sat_mid_math,
        body.sat_mid_reading,
        body.sat_p25_reading,
        body.sat_p25_math,
        body.sat_p25_writing,
        body.sat_p75_reading,
        body.sat_p75_math,
        body.sat_p75_writing,
        body.sat_rw_min,
        body.sat_rw_max,
        body.sat_math_min,
        body.sat_math_max,
        body.sat_min_and_max_value,
        unitid
      ]
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

