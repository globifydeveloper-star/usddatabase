import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ unit: string }> }
) {
  try {
    const { unit } = await params;
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE completion
      SET
        completed_2yrs = $1,
        completed_3yrs = $2,
        completed_4yrs = $3,
        completed_6yrs = $4
      WHERE unitid = $5
      RETURNING *;
      `,
      [
        body.completed_2yrs || null,
        body.completed_3yrs || null,
        body.completed_4yrs || null,
        body.completed_6yrs || null,
        unit
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
    console.error('PUT completion Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}