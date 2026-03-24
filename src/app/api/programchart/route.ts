import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
    try {
        const result = await pool.query(`
      WITH ranked AS (
        SELECT
          credential_title,
          COUNT(*) AS total,
          RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk
        FROM programs
        GROUP BY credential_title
      )
      SELECT
        CASE
          WHEN rnk <= 6 THEN credential_title
          ELSE 'Others'
        END AS credential_title,
        SUM(total)::int AS total
      FROM ranked
      GROUP BY
        CASE
          WHEN rnk <= 6 THEN credential_title
          ELSE 'Others'
        END
      ORDER BY total DESC;
    `);

        return NextResponse.json(result.rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'DB Error' }, { status: 500 });
    }
}
