import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ALLOWED_SORT_COLUMNS = [
  'unitid',
  'name',
  'city',
  'state',
  'zip',
  'address',
  'accreditor',
  'school_url',
  'degrees_awarded',
  'has_pseo',
  'ope8_id',
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 10);
    const search = searchParams.get('search') ?? '';
    const requestedSort = searchParams.get('sort') ?? 'unitid';
    const dir = searchParams.get('dir') === 'desc' ? 'DESC' : 'ASC';

    const sort = ALLOWED_SORT_COLUMNS.includes(requestedSort)
      ? requestedSort
      : 'unitid';

    const offset = (page - 1) * limit;

    const searchQuery = `
      WHERE 
        unitid::text ILIKE $1 OR
        name ILIKE $1 OR
        city ILIKE $1 OR
        state ILIKE $1
    `;

    const values = [`%${search}%`];

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) FROM schools ${searchQuery}`,
      values
    );

    const total = Number(countRows[0].count);

    const { rows } = await pool.query(
      `
      SELECT *
      FROM schools
      ${searchQuery}
      ORDER BY ${sort} ${dir}
      LIMIT $2 OFFSET $3
      `,
      [...values, limit, offset]
    );

    return NextResponse.json({ data: rows, total });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      unitid,
      name,
      city,
      state,
      zip,
      address,
      accreditor,
      school_url,
      degrees_awarded,
      has_pseo,
      ope8_id,
    } = body;

    // Unitid numbers only
    if (!/^\d+$/.test(unitid)) {
      return NextResponse.json(
        { success: false, message: 'UnitID must contain numbers only' },
        { status: 400 }
      );
    }

    // Mandatory fields
    if (!unitid || !name || !city || !state || !address || has_pseo === undefined || !ope8_id) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check duplicate
    const existing = await pool.query(
      `SELECT unitid, name FROM schools WHERE unitid = $1`,
      [unitid]
    );

    if (existing.rowCount !== 0) {
      return NextResponse.json(
        {
          success: false,
          exists: true,
          unitid: existing.rows[0].unitid,
          name: existing.rows[0].name,
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO schools (
        unitid,
        name,
        city,
        state,
        zip,
        address,
        accreditor,
        school_url,
        degrees_awarded,
        has_pseo,
        ope8_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
      `,
      [
        unitid,
        name,
        city,
        state,
        zip,
        address,
        accreditor,
        school_url,
        degrees_awarded,
        has_pseo,
        ope8_id,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Create school error:', error);

    return NextResponse.json(
      { success: false, message: 'Insert failed' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      unitid,
      name,
      city,
      state,
      zip,
      address,
      accreditor,
      school_url,
      degrees_awarded,
      has_pseo,
      ope8_id,
    } = body;

    if (!unitid) {
      return NextResponse.json(
        { success: false, message: 'UnitID required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      UPDATE schools
      SET
        name=$2,
        city=$3,
        state=$4,
        zip=$5,
        address=$6,
        accreditor=$7,
        school_url=$8,
        degrees_awarded=$9,
        has_pseo=$10,
        ope8_id=$11
      WHERE unitid=$1
      RETURNING *
      `,
      [
        unitid,
        name,
        city,
        state,
        zip,
        address,
        accreditor,
        school_url,
        degrees_awarded,
        has_pseo,
        ope8_id,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Update school error:', error);

    return NextResponse.json(
      { success: false, message: 'Update failed' },
      { status: 500 }
    );
  }
}