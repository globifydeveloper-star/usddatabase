import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT p.credential_title,
             AVG(c.tuition_program_year) AS avg_cost
      FROM programs p
      JOIN costs c ON c.unitid = p.unitid
      WHERE c.tuition_program_year IS NOT NULL
      GROUP BY p.credential_title
      ORDER BY avg_cost DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching cost distribution:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cost data' },
      { status: 500 }
    )
  }
}