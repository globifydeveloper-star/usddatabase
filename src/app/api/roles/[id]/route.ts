import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'roles' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    await pool.query("DELETE FROM roles WHERE id=$1", [id]);

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
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'roles' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { role_name } = await request.json();

    await pool.query(
      `UPDATE roles SET role_name=$1 WHERE id=$2`,
      [role_name, id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}