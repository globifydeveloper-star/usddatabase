import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'academics' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { unitid } = await params;
    const body = await request.json();

    const result = await pool.query(
      `
      UPDATE academics
      SET
        assoc = $1,
        degree = $2,
        bachelors = $3,
        certificate_lt_1yr = $4,
        certificate_lt_2yr = $5,
        certificate_lt_4yr = $6,
        degree_or_certificate = $7
      WHERE unitid = $8
      RETURNING *;
      `,
      [
        body.assoc ?? null,
        body.degree ?? null,
        body.bachelors ?? null,
        body.certificate_lt_1yr ?? null,
        body.certificate_lt_2yr ?? null,
        body.certificate_lt_4yr ?? null,
        body.degree_or_certificate ?? null,
        unitid
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
    console.error('PUT academics Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

/*  DELETE Academics  */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ unitid: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'academics' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { unitid } = await params;

    const result = await pool.query(
      `DELETE FROM academics WHERE unitid = $1 RETURNING *`,
      [unitid]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Academics data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academics data deleted successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("DELETE Academics Error:", error);

    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}