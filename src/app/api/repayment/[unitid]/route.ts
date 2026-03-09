import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  try {
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE repayment
      SET 
        yr1_completers = $1,
        yr1_noncompleters = $2,
        yr1_overall = $3,
        yr3_completers = $4,
        yr3_noncompleters = $5,
        yr3_overall = $6
      WHERE unitid = $7
      RETURNING *;
      `,
      [
        body.yr1_completers,
        body.yr1_noncompleters,
        body.yr1_overall,
        body.yr3_completers,
        body.yr3_noncompleters,
        body.yr3_overall,
        params.unitid, // ✅ use awaited value
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Repayment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Repayment updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("PUT Repayment Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}