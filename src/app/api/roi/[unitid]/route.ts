import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'roi' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE roi
      SET
        avg_salary = $1,
        total_cost = $2,
        roi_20yr = $3,
        credential_level = $4
      WHERE unitid = $5
      RETURNING *;
      `,
            [body.avg_salary, body.total_cost, body.roi_20yr, body.credential_level, params.unitid]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ success: false, message: 'ROI not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'ROI updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT ROI Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'roi' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const result = await pool.query(`DELETE FROM roi WHERE unitid = $1 RETURNING *`, [
            params.unitid,
        ]);

        if (result.rowCount === 0) {
            return NextResponse.json({ success: false, message: 'ROI not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'ROI deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE ROI Error:', error);
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
