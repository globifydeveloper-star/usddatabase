import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { unitid: string } }) {
    try {
        const { unitid } = await params;

        const result = await pool.query(
            `
            SELECT DISTINCT cip_code, title AS cip_title, credential_level, credential_title
            FROM programs
            WHERE unitid = $1
            ORDER BY cip_code
            `,
            [unitid]
        );

        return NextResponse.json({ data: result.rows });
    } catch (error) {
        console.error("CIP fetch error:", error);
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}