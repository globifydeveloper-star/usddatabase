
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext, assertTableWritable, sessionExpiredResponse } from '@/lib/auth';

export async function GET(request: Request) {
  if (!(await getAuthContext(request))) {
    return sessionExpiredResponse();
  }

  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';

  const offset = (page - 1) * limit;

  try {
   const dataQuery = `
  SELECT unitid, assoc, degree, bachelors, certificate_lt_1yr, certificate_lt_2yr, certificate_lt_4yr, degree_or_certificate
  FROM academics
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

const countQuery = `
  SELECT COUNT(*) FROM academics
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
  if (!(await assertTableWritable({ table: 'academics' }, auth))) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();

    const {
      unitid,
      assoc,
      degree,
      bachelors,
      certificate_lt_1yr,
      certificate_lt_2yr,
      certificate_lt_4yr,
      degree_or_certificate
    } = body;

    /* ---------- SCHOOL EXIST CHECK ---------- */

    const schoolCheck = await pool.query(
      `SELECT unitid FROM schools WHERE unitid = $1`,
      [unitid]
    );

    if (schoolCheck.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Unit ID not present in schools table",
        },
        { status: 400 }
      );
    }

    /* ---------- DUPLICATE CHECK ---------- */

    const academicsCheck = await pool.query(
      `SELECT unitid FROM academics WHERE unitid = $1`,
      [unitid]
    );

    if (academicsCheck.rowCount !== 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Academics data already exists for this Unit ID",
        },
        { status: 400 }
      );
    }

    /* ---------- INSERT ---------- */

    const insertQuery = `
      INSERT INTO academics (
        unitid,
        assoc,
        degree,
        bachelors,
        certificate_lt_1yr,
        certificate_lt_2yr,
        certificate_lt_4yr,
        degree_or_certificate
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      unitid,
      assoc,
      degree,
      bachelors,
      certificate_lt_1yr,
      certificate_lt_2yr,
      certificate_lt_4yr,
      degree_or_certificate
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Create Academics Error:", error);

    return NextResponse.json(
      { success: false, message: "Insert failed" },
      { status: 500 }
    );
  }
}