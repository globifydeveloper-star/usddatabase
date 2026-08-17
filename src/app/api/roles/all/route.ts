import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getAuthContext, sessionExpiredResponse } from "@/lib/auth";

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }

  try {
    const result = await pool.query(`
      SELECT id, role_name
      FROM roles
      ORDER BY role_name ASC
    `);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Roles Dropdown Error:", error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}