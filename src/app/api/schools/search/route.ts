import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (!q) {
      return NextResponse.json({ data: [] });
    }

    const result = await pool.query(
      `
      SELECT unitid, name
      FROM schools
      WHERE unitid::text ILIKE $1
      OR name ILIKE $1
      ORDER BY unitid
      LIMIT 10
      `,
      [`${q}%`]
    );

    return NextResponse.json({
      data: result.rows,
    });

  } catch (error) {
    console.error("School search error:", error);

    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}