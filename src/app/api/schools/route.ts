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

        const sort = ALLOWED_SORT_COLUMNS.includes(requestedSort) ? requestedSort : 'unitid';

        const offset = (page - 1) * limit;

        const searchQuery = `
      WHERE 
        unitid::text ILIKE $1 OR
        name ILIKE $1 OR
        city ILIKE $1 OR
        state ILIKE $1 
    `;

        const values = [`%${search}%`];

        // Total count
        const { rows: countRows } = await pool.query(
            `SELECT COUNT(*) FROM schools ${searchQuery}`,
            values
        );

        const total = Number(countRows[0].count);

        // Paginated data
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
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}
