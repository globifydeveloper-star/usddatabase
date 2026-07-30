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
  if (!(await assertTableWritable({ table: 'completion' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = await params;
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE completion
      SET
        completed_2yrs = $1,
        completed_3yrs = $2,
        completed_4yrs = $3,
        completed_6yrs = $4,
        emp_factor = $5,
        completion_rate = $6
      WHERE unitid = $7
      RETURNING *;
      `,
            [
                body.completed_2yrs || null,
                body.completed_3yrs || null,
                body.completed_4yrs || null,
                body.completed_6yrs || null,
                body.emp_factor || null,
                body.completion_rate || null,
                unitid,
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
        console.error('PUT completion Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
/*  DELETE Completion  */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ unitid: string }> }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'completion' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
    const { unitid } = await params;
        const result = await pool.query(`DELETE FROM completion WHERE unitid = $1 RETURNING *`, [
            unitid,
        ]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Completion data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Completion data deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Completion Error:', error);

        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
