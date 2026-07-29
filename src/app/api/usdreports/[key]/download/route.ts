import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(_request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const id = decodeURIComponent(params.key);

    const result = await pool.query(
      `SELECT pdf_data, mime_type, report_reference_id FROM usdreports WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0 || !result.rows[0].pdf_data) {
      return NextResponse.json({ success: false, message: 'PDF not found' }, { status: 404 });
    }

    const { pdf_data, mime_type, report_reference_id } = result.rows[0];
    const filename = `${report_reference_id || `usdreport-${id}`}.pdf`;

    return new NextResponse(pdf_data, {
      status: 200,
      headers: {
        'Content-Type': mime_type || 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Download usdreports Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
