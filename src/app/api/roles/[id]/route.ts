import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query("DELETE FROM roles WHERE id=$1", [params.id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { role_name } = await request.json();

    await pool.query(
      `UPDATE roles SET role_name=$1 WHERE id=$2`,
      [role_name, params.id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}