import 'server-only';
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getAuthContext } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const editorUserId = searchParams.get('editor_user_id');
  if (!editorUserId) {
    return NextResponse.json({ error: 'editor_user_id is required' }, { status: 400 });
  }

  const result = await pool.query(
    'SELECT table_name FROM cms_editor_table_permissions WHERE editor_user_id = $1 ORDER BY table_name',
    [editorUserId]
  );
  return NextResponse.json({ tableNames: result.rows.map((r) => r.table_name) });
}

export async function PUT(request: Request) {
  const auth = getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { editor_user_id, tableNames } = body;
  if (!editor_user_id || !Array.isArray(tableNames)) {
    return NextResponse.json(
      { success: false, message: 'editor_user_id and tableNames[] are required' },
      { status: 400 }
    );
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM cms_editor_table_permissions WHERE editor_user_id = $1', [
      editor_user_id,
    ]);

    for (const tableName of tableNames) {
      await client.query(
        `INSERT INTO cms_editor_table_permissions (editor_user_id, table_name, granted_by)
         VALUES ($1, $2, $3)`,
        [editor_user_id, tableName, auth.userId]
      );
    }

    await client.query('COMMIT');
    return NextResponse.json({ success: true, tableNames });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Update cms_editor_table_permissions Error:', error);
    return NextResponse.json(
      { success: false, message: error?.detail || 'Server error' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
