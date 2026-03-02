
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';

  const offset = (page - 1) * limit;

  try {
 const dataQuery = `
  SELECT unitid, booksupply, tuition_in_state, tuition_out_state, tuition_program_year , roomboard_oncampus, roomboard_offcampus, avg_net_price_public
         avg_net_price_private, avg_net_price_overall, otherexpense_oncampus, otherexpense_offcampus, otherexpense_withfamily
  FROM costs
  WHERE unitid::text ILIKE $1
  LIMIT $2 OFFSET $3
`;

const countQuery = `
  SELECT COUNT(*) FROM costs
  WHERE unitid::text ILIKE $1
`;

    const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
    const countResult = await pool.query(countQuery, [`%${search}%`]);

    return NextResponse.json({
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}