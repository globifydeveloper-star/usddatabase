import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'aid' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE aid
      SET loan_principal = $1,
          pell_grant_rate = $2,
          federal_loan_rate = $3,
          students_with_any_loan = $4
      WHERE unitid = $5
      RETURNING *;
      `,
            [
                Number(body.loan_principal),
                Number(body.pell_grant_rate),
                Number(body.federal_loan_rate),
                Number(body.students_with_any_loan),
                Number(params.unitid),
            ]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Aid record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Aid updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Aid Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'aid' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = params;

        const result = await pool.query(`DELETE FROM aid WHERE unitid = $1 RETURNING *`, [unitid]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Aid data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Aid data deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Aid Error:', error);

        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
