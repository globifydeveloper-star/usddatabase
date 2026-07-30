import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'repayment' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE repayment
      SET 
        yr1_completers = $1,
        yr1_noncompleters = $2,
        yr1_overall = $3,
        yr3_completers = $4,
        yr3_noncompleters = $5,
        all_borrowers_3yr = $6,
        graduates_3yr = $7,
        non_completers_3yr = $8,
        repayment_success = $9,
        yr3_overall = $10
      WHERE unitid = $11
      RETURNING *;
      `,
            [
                body.yr1_completers,
                body.yr1_noncompleters,
                body.yr1_overall,
                body.yr3_completers,
                body.yr3_noncompleters,
                body.all_borrowers_3yr,
                body.graduates_3yr,
                body.non_completers_3yr,
                body.repayment_success,
                body.yr3_overall,
                params.unitid, 
            ]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Repayment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Repayment updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Repayment Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'repayment' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = params;

        const result = await pool.query(`DELETE FROM repayment WHERE unitid = $1 RETURNING *`, [
            unitid,
        ]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Repayment data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Repayment data deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Repayment Error:', error);

        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
