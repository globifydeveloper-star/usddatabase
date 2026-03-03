import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT school_type, COUNT(*) as total_programs
      FROM programs
      GROUP BY school_type
      ORDER BY total_programs DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching program stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch program statistics' },
      { status: 500 }
    )
  }
}