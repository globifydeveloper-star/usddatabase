import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { unitid: string } }
) {
  try {
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE aid
      SET loan_principal = $1,
          pell_grant_rate = $2,
          federal_loan_rate = $3,
          students_with_any_loan = $4
      WHERE unitid = $5
      RETURNING *;
      `,
      [
        Number(body.loan_principal),
        Number(body.pell_grant_rate),
        Number(body.federal_loan_rate),
        Number(body.students_with_any_loan),
        Number(params.unitid), 
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Aid record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Aid updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('PUT Aid Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}