export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";  

export async function GET() {
  try {
    const totalSchools = await pool.query(
      `SELECT COUNT(*) FROM schools`
    );

    const totalPrograms = await pool.query(
      `SELECT COUNT(*) FROM programs`
    );

    return NextResponse.json({
      totalSchools: Number(totalSchools.rows[0].count),
      totalPrograms: Number(totalPrograms.rows[0].count),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}