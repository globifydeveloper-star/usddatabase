import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, assertTableWritable } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 20);
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    try {
        const dataQuery = `
      SELECT unitid, booksupply, tuition_in_state, tuition_out_state,
             tuition_program_year, roomboard_oncampus, roomboard_offcampus,
             avg_net_price_public, avg_net_price_private, avg_net_price_overall,
             otherexpense_oncampus, otherexpense_offcampus, otherexpense_withfamily,
             for_roi_data
      FROM costs
      WHERE unitid::text ILIKE $1
      LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*) FROM costs
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
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'costs' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const {
            unitid,
            booksupply,
            tuition_in_state,
            tuition_out_state,
            tuition_program_year,
            roomboard_oncampus,
            roomboard_offcampus,
            avg_net_price_public,
            avg_net_price_private,
            avg_net_price_overall,
            otherexpense_oncampus,
            otherexpense_offcampus,
            otherexpense_withfamily,
            for_roi_data,
        } = body;

        /* ---------- SCHOOL EXIST CHECK ---------- */
        const schoolCheck = await pool.query(`SELECT unitid FROM schools WHERE unitid = $1`, [
            unitid,
        ]);

        if (schoolCheck.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: 'School not found for this Unit ID' },
                { status: 404 }
            );
        }

        /* ---------- DUPLICATE CHECK ---------- */
        const costCheck = await pool.query(`SELECT unitid FROM costs WHERE unitid = $1`, [unitid]);

        if (costCheck.rowCount !== 0) {
            return NextResponse.json(
                { success: false, message: 'Costs data already exists for this Unit ID' },
                { status: 400 }
            );
        }

        /* ---------- INSERT ---------- */
        const insertQuery = `
      INSERT INTO costs (
        unitid, booksupply, tuition_in_state, tuition_out_state,
        tuition_program_year, roomboard_oncampus, roomboard_offcampus,
        avg_net_price_public, avg_net_price_private, avg_net_price_overall,
        otherexpense_oncampus, otherexpense_offcampus, otherexpense_withfamily,
        for_roi_data
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            booksupply,
            tuition_in_state,
            tuition_out_state,
            tuition_program_year,
            roomboard_oncampus,
            roomboard_offcampus,
            avg_net_price_public,
            avg_net_price_private,
            avg_net_price_overall,
            otherexpense_oncampus,
            otherexpense_offcampus,
            otherexpense_withfamily,
            for_roi_data,
        ]);

        return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Create Costs Error:', error);
        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
