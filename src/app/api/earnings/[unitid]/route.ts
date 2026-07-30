import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { unitid: string } }
) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'earnings' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE earnings
      SET 
        median_1yr = $1,
        median_3yr = $2,
        median_4yr = $3,
        median_5yr = $4,
        students_count = $5
      WHERE unitid = $6
      RETURNING *;
      `,
      [
        body.median_1yr || null,
        body.median_3yr || null,
        body.median_4yr || null,
        body.median_5yr || null,
        body.students_count || null,
        params?.unitid,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Earnings record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Earnings updated successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("PUT Earnings Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}