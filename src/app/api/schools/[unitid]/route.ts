import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/* UPDATE SCHOOL  */
export async function PUT(
  request: NextRequest,
  { params }: { params: { unitid: string } }
) {
  try {
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE schools
      SET 
        name = $1,
        city = $2,
        state = $3,
        zip = $4,
        address = $5,
        accreditor = $6,
        school_url = $7,
        degrees_awarded = $8,
        has_pseo = $9,
        ope8_id = $10,
        program_count = $11
      WHERE unitid = $12
      RETURNING *;
      `,
      [
        body.name,
        body.city,
        body.state,
        body.zip,
        body.address,
        body.accreditor,
        body.school_url,
        body.degrees_awarded,
        body.has_pseo,
        body.ope8_id,
        body.program_count,
        params.unitid,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "School not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "School updated successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("PUT School Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


/* DELETE SCHOOL */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { unitid: string } }
) {
  try {
    const result = await pool.query(
      `DELETE FROM schools WHERE unitid = $1 RETURNING *`,
      [params.unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "School not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "School deleted successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("DELETE School Error:", error);

    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}