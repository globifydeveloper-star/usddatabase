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
      UPDATE programs
      SET 
        cip_code = $1,
        title = $2,
        credential_level = $3,
        credential_title = $4,
        school_name = $5,
        school_type = $6
      WHERE unitid = $7
      RETURNING *;
      `,
      [
        body.cip_code,
        body.title,
        body.credential_level,
        body.credential_title,
        body.school_name,
        body.school_type,
        params.unitid,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Program updated successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("PUT Program Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}