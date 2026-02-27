import { NextRequest, NextResponse } from "next/server"
import {pool} from "@/lib/db" 

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get("page")) || 1
    const limit = 50
    const offset = (page - 1) * limit
    const result = await pool.query(`
      SELECT 
        unitid,
        name,
        city,
        state,
        zip,
        address,
        accreditor,
        degrees_awarded,
        ope8_id
        school_url
      FROM schools
      ORDER BY name
    LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
  }
}