import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'users' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const userId = Number(params.id);

  try {
    const body = await request.json();

    const {
      full_name,
      email,
      is_active,
      role_id
    } = body;

    const updateQuery = `
      UPDATE users
      SET 
        full_name = $1,
        email = $2,
        is_active = $3,
        role_id = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;

    const result = await pool.query(updateQuery, [
      full_name,
      email,
      is_active,
      role_id,
      userId,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error: any) {
  console.error("Update User Error:", error);
  
  return NextResponse.json(
    { 
      success: false, 
      message: error.message || "Server Error" 
    },
    { status: 500 }
  );
}
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = getAuthContext(req);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'users' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [params.id]
    );

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}