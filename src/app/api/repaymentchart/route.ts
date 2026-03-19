import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
    try {
        const { rows } = await pool.query(`
      SELECT 
        unitid,
        yr1_overall,
        yr3_overall
      FROM repayment
      ORDER BY unitid
      LIMIT 20
    `);

        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'DB Error' }, { status: 500 });
    }
}
