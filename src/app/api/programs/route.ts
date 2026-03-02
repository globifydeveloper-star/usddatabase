// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// const ALLOWED_SORT_COLUMNS = [
//     'unitid',
//     'cip_code',
//     'title',
//     'credential_level',
//     'credential_title',
//     'school_name',
//     'school_type',
// ];

// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);

//         const page = Number(searchParams.get('page') ?? 1);
//         const limit = Number(searchParams.get('limit') ?? 10);
//         const search = searchParams.get('search') ?? '';
//         const requestedSort = searchParams.get('sort') ?? 'unitid';
//         const dir = searchParams.get('dir') === 'desc' ? 'DESC' : 'ASC';

//         const sort = ALLOWED_SORT_COLUMNS.includes(requestedSort) ? requestedSort : 'unitid';

//         const offset = (page - 1) * limit;

//         const searchQuery = `
//       WHERE 
//         unitid::text ILIKE $1 OR
//         cip_code ILIKE $1 OR
//         title ILIKE $1 OR
//         credential_level ILIKE $1 
//     `;

//         const values = [`%${search}%`];

//         // Total count
//         const { rows: countRows } = await pool.query(
//             `SELECT COUNT(*) FROM programs ${searchQuery}`,
//             values
//         );

//         const total = Number(countRows[0].count);

//         // Paginated data
//         const { rows } = await pool.query(
//             `
//       SELECT *
//       FROM programs
//       ${searchQuery}
//       ORDER BY ${sort} ${dir}
//       LIMIT $2 OFFSET $3
//       `,
//             [...values, limit, offset]
//         );

//         return NextResponse.json({ data: rows, total });
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
//     }
// }


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
      SELECT id, unitid, cip_code, title,
             credential_level, credential_title,
             school_name, school_type
      FROM programs
      WHERE title ILIKE $1
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM programs
      WHERE title ILIKE $1
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