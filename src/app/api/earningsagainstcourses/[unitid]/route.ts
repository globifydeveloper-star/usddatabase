import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ unitid: string }> }) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'earnings_against_courses' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = await params;
        const body = await req.json();

        const parseNumber = (val: any) => (val === '-' || val === '' ? null : val);

        const result = await pool.query(
            `
      UPDATE earnings_against_courses
      SET
        ope8_id = $1,
        school_name = $2,
        cip_code = $3,
        cip_title = $4,
        grad_cohort = $5,
        year_1 = $6,
        year_5 = $7,
        year_10 = $8,
        credential_level = $9,
        credential_title = $10,
        avg_salary = $11
      WHERE unitid = $12
      RETURNING *;
      `,
            [
                parseNumber(body.ope8_id),
                body.school_name ?? null,
                body.cip_code ?? null,
                body.cip_title ?? null,
                body.grad_cohort ?? null,
                parseNumber(body.year_1),
                parseNumber(body.year_5),
                parseNumber(body.year_10),
                body.credential_level ?? null,
                body.credential_title ?? null,
                parseNumber(body.avg_salary),
                unitid,
            ]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Record updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Earnings Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ unitid: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'earnings_against_courses' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = await params;

        const result = await pool.query(
            `DELETE FROM earnings_against_courses WHERE unitid = $1 RETURNING *`,
            [unitid]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Earnings data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Earnings data deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Earnings Data Error:', error);

        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
