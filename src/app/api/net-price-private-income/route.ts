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
      SELECT unitid, income_0_30000, income_0_48000, income_30001_48000,
             income_30001_75000, income_48001_75000, income_75001_110000,
             income_75000_plus, income_110001_plus
      FROM net_price_private_income
      WHERE unitid::text ILIKE $1
      LIMIT $2 OFFSET $3
    `;

        const countQuery = `
      SELECT COUNT(*) FROM net_price_private_income
      WHERE unitid::text ILIKE $1
    `;

        const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
        const countResult = await pool.query(countQuery, [`%${search}%`]);

        return NextResponse.json({
            data: dataResult.rows,
            total: Number(countResult.rows[0].count),
        });
    } catch (error) {
        console.error('Net Price Private Income GET Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (!(await assertTableWritable({ table: 'net_price_private_income' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

    try {
        const body = await request.json();

        const {
            unitid,
            income_0_30000,
            income_0_48000,
            income_30001_48000,
            income_30001_75000,
            income_48001_75000,
            income_75001_110000,
            income_75000_plus,
            income_110001_plus,
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
        const duplicateCheck = await pool.query(
            `SELECT unitid FROM net_price_private_income WHERE unitid = $1`,
            [unitid]
        );
        if (duplicateCheck.rowCount !== 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Net price private income data already exists for this Unit ID',
                },
                { status: 400 }
            );
        }

        const insertQuery = `
      INSERT INTO net_price_private_income (
        unitid, income_0_30000, income_0_48000, income_30001_48000,
        income_30001_75000, income_48001_75000, income_75001_110000,
        income_75000_plus, income_110001_plus
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;

        const result = await pool.query(insertQuery, [
            unitid,
            income_0_30000,
            income_0_48000,
            income_30001_48000,
            income_30001_75000,
            income_48001_75000,
            income_75001_110000,
            income_75000_plus,
            income_110001_plus,
        ]);

        return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Create Net Price Private Income Error:', error);
        return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 500 });
    }
}
