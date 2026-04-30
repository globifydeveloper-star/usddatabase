import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
    try {
        const body = await request.json();

        const result = await pool.query(
            `
      UPDATE net_price_private_income
      SET
        income_0_30000 = $1,
        income_0_48000 = $2,
        income_30001_48000 = $3,
        income_30001_75000 = $4,
        income_48001_75000 = $5,
        income_75001_110000 = $6,
        income_75000_plus = $7,
        income_110001_plus = $8
      WHERE unitid = $9
      RETURNING *;
      `,
            [
                body.income_0_30000,
                body.income_0_48000,
                body.income_30001_48000,
                body.income_30001_75000,
                body.income_48001_75000,
                body.income_75001_110000,
                body.income_75000_plus,
                body.income_110001_plus,
                params.unitid,
            ]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Net price private income record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Net price private income updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('PUT Net Price Private Income Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { unitid: string } }) {
    try {
        const { unitid } = params;

        const result = await pool.query(
            `DELETE FROM net_price_private_income WHERE unitid = $1 RETURNING *`,
            [unitid]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Net price private income record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Net price private income record deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('DELETE Net Price Private Income Error:', error);
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
