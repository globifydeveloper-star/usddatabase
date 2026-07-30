import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'costs' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE costs
      SET 
        booksupply = $1,
        tuition_in_state = $2,
        tuition_out_state = $3,
        tuition_program_year = $4,
        roomboard_oncampus = $5,
        roomboard_offcampus = $6,
        avg_net_price_public = $7,
        avg_net_price_private = $8,
        avg_net_price_overall = $9,
        otherexpense_oncampus = $10,
        otherexpense_offcampus = $11,
        otherexpense_withfamily = $12,
        for_roi_data = $13
      WHERE unitid = $14
      RETURNING *;
      `,
            [
                body.booksupply,
                body.tuition_in_state,
                body.tuition_out_state,
                body.tuition_program_year,
                body.roomboard_oncampus,
                body.roomboard_offcampus,
                body.avg_net_price_public,
                body.avg_net_price_private,
                body.avg_net_price_overall,
                body.otherexpense_oncampus,
                body.otherexpense_offcampus,
                body.otherexpense_withfamily,
                body.for_roi_data,
                params.unitid,
            ]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Costs record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Costs updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Costs Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
  const auth = getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'costs' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const { unitid } = params;

        const result = await pool.query(`DELETE FROM costs WHERE unitid = $1 RETURNING *`, [
            unitid,
        ]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Costs data not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Costs data deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Costs Error:', error);

        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
