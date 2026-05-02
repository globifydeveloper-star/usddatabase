import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 20);
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    try {
        const dataQuery = `
    SELECT unitid, avg_salary, total_cost, roi_20yr, credential_level
    FROM roi
    WHERE unitid::text ILIKE $1
    LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*) FROM roi
      WHERE unitid::text ILIKE $1
    `;

        const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
        const countResult = await pool.query(countQuery, [`%${search}%`]);

        return NextResponse.json({
            data: dataResult.rows,
            total: Number(countResult.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { unitid, avg_salary, total_cost, roi_20yr,credential_level } = body;
        /* ---------- SCHOOL EXIST CHECK ---------- */
        const schoolCheck = await pool.query(`SELECT unitid FROM schools WHERE unitid = $1`, [
            unitid,
        ]);
        if (schoolCheck.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'School not found for this Unit ID' },
                { status: 400 }
            );
        }
        /* ---------- DUPLICATE CHECK ---------- */
        const roiCheck = await pool.query(`SELECT unitid FROM roi WHERE unitid = $1`, [unitid]);
        if (roiCheck.rowCount !== 0) {
            return NextResponse.json(
                { success: false, message: 'ROI data already exists for this Unit ID' },
                { status: 400 }
            );
        }
        /* ---------- INSERT ---------- */
        const insertQuery = `
      INSERT INTO roi (
        unitid,
        avg_salary,
        total_cost,
        roi_20yr,
        credential_level
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [unitid, avg_salary, total_cost, roi_20yr, credential_level]);
console.log('Insert ROI Result:', result);
        return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Create ROI Error:', error);
        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
