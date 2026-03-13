import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/* UPDATE PROGRAM */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  try {
    const { unitid } = await params;
    const body = await request.json();

    const {
      id,
      cip_code,
      title,
      credential_level,
      credential_title,
      school_name,
      school_type,
    } = body;

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
      WHERE id = $7 AND unitid = $8
      RETURNING *
      `,
      [
        cip_code,
        title,
        credential_level,
        credential_title,
        school_name,
        school_type,
        id,
        unitid,
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
    console.error("PUT programs error:", error);

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}


/* DELETE PROGRAM */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  try {
    const { unitid } = await params;

    const result = await pool.query(
      `DELETE FROM programs WHERE unitid = $1 RETURNING *`,
      [unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Program deleted successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("DELETE programs error:", error);

    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}