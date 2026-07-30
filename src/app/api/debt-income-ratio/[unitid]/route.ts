import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'debt_income_ratio' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE debt_income_ratio
      SET
        avg_debt = $1,
        avg_income = $2,
        debt_income_ratio = $3,
        ratio_text = $4
      WHERE unitid = $5
      RETURNING *;
      `,
            [body.avg_debt, body.avg_income, body.debt_income_ratio, body.ratio_text, params.unitid]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Debt income ratio record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Debt income ratio updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Debt Income Ratio Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'debt_income_ratio' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = params;

        const result = await pool.query(
            `DELETE FROM debt_income_ratio WHERE unitid = $1 RETURNING *`,
            [unitid]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Debt income ratio record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Debt income ratio record deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Debt Income Ratio Error:', error);
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
