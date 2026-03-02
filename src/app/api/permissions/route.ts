import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const offset = (page - 1) * limit;

  try {
    const dataQuery = `
      SELECT 
        p.id,
        p.user_id,
        u.full_name,
        p.table_name,
        p.can_read,
        p.can_edit,
        p.can_delete
      FROM permissions p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE 
        u.full_name ILIKE $1
        OR p.table_name ILIKE $1
      ORDER BY p.id DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM permissions p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE 
        u.full_name ILIKE $1
        OR p.table_name ILIKE $1
    `;

    const dataResult = await pool.query(dataQuery, [
      `%${search}%`,
      limit,
      offset,
    ]);

    const countResult = await pool.query(countQuery, [
      `%${search}%`,
    ]);

    return NextResponse.json({
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
      page,
      limit,
    });

  } catch (error) {
    console.error("Permissions API Error:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}