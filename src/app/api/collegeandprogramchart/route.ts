import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
    const result = await pool.query(`
    WITH top_schools AS (
        SELECT unitid
        FROM programs
        GROUP BY unitid
        ORDER BY COUNT(*) DESC
        LIMIT 10
    )
    SELECT
        s.name AS school_name,

        COUNT(*) FILTER (
            WHERE p.credential_title = 'Bachelor''s Degree'
        )::int AS bachelors,

        COUNT(*) FILTER (
            WHERE p.credential_title = 'Associate''s Degree'
        )::int AS associates,

        COUNT(*) FILTER (
            WHERE p.credential_title = 'Undergraduate Certificate or Diploma'
        )::int AS undergraduate,

        COUNT(*) FILTER (
            WHERE p.credential_title = 'Master''s Degree'
        )::int AS masters

    FROM programs p
    JOIN schools s ON s.unitid = p.unitid
    JOIN top_schools t ON t.unitid = p.unitid

    GROUP BY s.name
    ORDER BY COUNT(*) DESC;
  `);

    return NextResponse.json(result.rows);
}
