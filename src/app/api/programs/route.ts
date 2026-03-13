
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';

  const offset = (page - 1) * limit;

  try {
    const dataQuery = `
      SELECT id, unitid, cip_code, title,
             credential_level, credential_title,
             school_name, school_type
      FROM programs
      WHERE title ILIKE $1 OR
      unitid::text ILIKE $1 OR
    cip_code::text ILIKE $1 OR
    school_name ILIKE $1 OR
    credential_title ILIKE $1
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM programs
      WHERE 
    title ILIKE $1 OR
    unitid::text ILIKE $1 OR
    cip_code::text ILIKE $1 OR
    school_name ILIKE $1 OR
    credential_title ILIKE $1
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
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      unitid,
      cip_code,
      title,
      credential_level,
      credential_title,
      school_name,
      school_type
    } = body;

    if (
      !unitid ||
      !cip_code ||
      !title ||
      !credential_level ||
      !credential_title ||
      !school_name ||
      !school_type
    ) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO programs (
        unitid,
        cip_code,
        title,
        credential_level,
        credential_title,
        school_name,
        school_type
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        unitid,
        cip_code,
        title,
        credential_level,
        credential_title,
        school_name,
        school_type
      ]
    );

    return Response.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Insert failed" },
      { status: 500 }
    );
  }
}