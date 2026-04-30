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
      SELECT unitid, test_requirements, admission_rate , sat_avg_overall, sat_mid_math, sat_mid_reading, sat_p25_reading, sat_p25_math, sat_p25_writing, sat_p75_reading, sat_p75_math, sat_p75_writing, sat_rw_min, sat_rw_max, sat_math_min, sat_math_max
      FROM admissions
      WHERE unitid::text ILIKE $1
      LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*) FROM admissions
      WHERE unitid::text ILIKE $1
    `;

        const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);

        const countResult = await pool.query(countQuery, [`%${search}%`]);

        return NextResponse.json({
            data: dataResult.rows,
            total: Number(countResult.rows[0].count),
        });
    } catch (error) {
        console.error('Admissions API error:', error);

        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            unitid,
            test_requirements,
            admission_rate,
            sat_avg_overall,
            sat_mid_math,
            sat_mid_reading,
            sat_p25_reading,
            sat_p25_math,
            sat_p25_writing,
            sat_p75_reading,
            sat_p75_math,
            sat_p75_writing,
            sat_rw_min,
            sat_rw_max,
            sat_math_min,
            sat_math_max,
        } = body;

        //Check if school exists
        const schoolCheck = await pool.query('SELECT unitid FROM schools WHERE unitid = $1', [
            unitid,
        ]);

        if (schoolCheck.rowCount === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unit ID is not present in schools table',
                },
                { status: 400 }
            );
        }

        //Check duplicate admission
        const admissionCheck = await pool.query('SELECT unitid FROM admissions WHERE unitid = $1', [
            unitid,
        ]);

        if (admissionCheck.rowCount !== 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Admission record already exists for this unitid',
                },
                { status: 400 }
            );
        }

        //Insert admission
        const insertQuery = `
      INSERT INTO admissions (
        unitid,
        test_requirements,
        admission_rate,
        sat_avg_overall,
        sat_mid_math,
        sat_mid_reading,
        sat_p25_reading,
        sat_p25_math,
        sat_p25_writing,
        sat_p75_reading,
        sat_p75_math,
        sat_p75_writing,
        sat_rw_min,
        sat_rw_max,
        sat_math_min,
        sat_math_max
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            test_requirements,
            admission_rate,
            sat_avg_overall,
            sat_mid_math,
            sat_mid_reading,
            sat_p25_reading,
            sat_p25_math,
            sat_p25_writing,
            sat_p75_reading,
            sat_p75_math,
            sat_p75_writing,
            sat_rw_min,
            sat_rw_max,
            sat_math_min,
            sat_math_max,
        ]);

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create Admission Error:', error);

        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
