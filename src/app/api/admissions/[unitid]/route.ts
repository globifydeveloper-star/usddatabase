import { pool } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { unitid: string } }) {
    try {
        const body = await request.json();

        const result = await pool.query(
            `
     UPDATE admissions
SET
  test_requirements = $1,
  admission_rate = $2
WHERE unitid = $3
RETURNING *;
      `,
            [body.test_requirements, body.admission_rate, params.unitid]
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
        console.error('PUT admissions Error:', error);

        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
