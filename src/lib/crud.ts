import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { pool } from './db';
import { getAuthContext, assertTableWritable } from './auth';
import { logAudit } from './audit';

/**
 * Reusable, config-driven CRUD route factory.
 *
 * Centralises the list/create/update/delete SQL so each table only declares a
 * small config object instead of repeating near-identical handlers. Mirrors the
 * response shapes already used across the project:
 *   list   -> { data, total }
 *   mutate -> { success, message, data }
 */

export interface CrudTableConfig {
  table: string;
  /** primary key column(s) */
  pk: string[];
  /** columns that can be inserted/updated (exclude auto id / created_at) */
  columns: string[];
  /** text-ish columns used for ILIKE search */
  searchColumns: string[];
  /** extra select expressions from joins, e.g. `, s.name AS school_name` */
  selectExtra?: string;
  /** join clause, e.g. `LEFT JOIN schools s ON s.unitid = t.unitid` */
  joins?: string;
  /** set updated_at = now() on update */
  autoUpdatedAt?: boolean;
  /** override columns selected for the list query (defaults to `t.*`) — use to exclude large/blob columns */
  listColumns?: string[];
}

// jsonb / array params must be serialized for node-pg
const norm = (v: any) =>
  v !== null && typeof v === 'object' && !Array.isArray(v) ? JSON.stringify(v) : v;

function buildSearchClause(cfg: CrudTableConfig, paramIndex: number) {
  const cols = cfg.searchColumns.length
    ? cfg.searchColumns.map((c) => `t.${c}::text`)
    : cfg.pk.map((c) => `t.${c}::text`);
  return cols.map((c) => `${c} ILIKE $${paramIndex}`).join(' OR ');
}

export function makeList(cfg: CrudTableConfig) {
  return async function GET(request: Request) {
    // Belt-and-suspenders alongside middleware.ts, which already blocks
    // unauthenticated requests to /api/* — reads are open to any
    // authenticated role (superadmin/editor/viewer).
    if (!(await getAuthContext(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 20);
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    try {
      const where = `WHERE ${buildSearchClause(cfg, 1)}`;
      const selectCols = cfg.listColumns
        ? cfg.listColumns.map((c) => `t.${c}`).join(', ')
        : 't.*';
      const dataQuery = `
        SELECT ${selectCols}${cfg.selectExtra || ''}
        FROM ${cfg.table} t
        ${cfg.joins || ''}
        ${where}
        ORDER BY ${cfg.pk.map((c) => `t.${c}`).join(', ')}
        LIMIT $2 OFFSET $3
      `;
      const countQuery = `SELECT COUNT(*) FROM ${cfg.table} t ${cfg.joins || ''} ${where}`;

      const dataResult = await pool.query(dataQuery, [`%${search}%`, limit, offset]);
      const countResult = await pool.query(countQuery, [`%${search}%`]);

      return NextResponse.json({
        data: dataResult.rows,
        total: Number(countResult.rows[0].count),
      });
    } catch (error) {
      console.error(`GET ${cfg.table} Error:`, error);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  };
}

export function makeCreate(cfg: CrudTableConfig) {
  return async function POST(request: Request) {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    if (!(await assertTableWritable(cfg, auth))) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    try {
      const body = await request.json();
      const cols = cfg.columns.filter((c) => body[c] !== undefined);

      if (cols.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No data provided' },
          { status: 400 }
        );
      }

      const values = cols.map((c) => norm(body[c]));
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

      const result = await pool.query(
        `INSERT INTO ${cfg.table} (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        values
      );

      await logAudit(auth, {
        table_name: cfg.table,
        action: 'create',
        record_id: recordIdFrom(cfg, result.rows[0]),
      });

      return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (error: any) {
      console.error(`Create ${cfg.table} Error:`, error);
      return NextResponse.json(
        { success: false, message: error?.detail || 'Insert failed' },
        { status: 500 }
      );
    }
  };
}

// Decodes the `[key]` path segment back into ordered PK values ('~' separated)
function decodeKey(key: string): string[] {
  return decodeURIComponent(key)
    .split('~')
    .map((v) => decodeURIComponent(v));
}

function recordIdFrom(cfg: CrudTableConfig, row: any): string {
  return cfg.pk.map((c) => row[c]).join('~');
}

export function makeUpdate(cfg: CrudTableConfig) {
  return async function PUT(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    if (!(await assertTableWritable(cfg, auth))) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    try {
      const body = await request.json();
      const { key } = await params;
      const keyValues = decodeKey(key);

      const cols = cfg.columns.filter((c) => body[c] !== undefined && !cfg.pk.includes(c));
      if (cols.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No data provided' },
          { status: 400 }
        );
      }

      const setParts = cols.map((c, i) => `${c} = $${i + 1}`);
      if (cfg.autoUpdatedAt) setParts.push(`updated_at = now()`);

      const whereParts = cfg.pk.map((c, i) => `${c} = $${cols.length + i + 1}`);
      const values = [...cols.map((c) => norm(body[c])), ...keyValues];

      const result = await pool.query(
        `UPDATE ${cfg.table} SET ${setParts.join(', ')} WHERE ${whereParts.join(' AND ')} RETURNING *`,
        values
      );

      if (result.rowCount === 0) {
        return NextResponse.json({ success: false, message: 'Record not found' }, { status: 404 });
      }

      await logAudit(auth, {
        table_name: cfg.table,
        action: 'update',
        record_id: recordIdFrom(cfg, result.rows[0]),
      });

      return NextResponse.json({
        success: true,
        message: 'Updated successfully',
        data: result.rows[0],
      });
    } catch (error: any) {
      console.error(`Update ${cfg.table} Error:`, error);
      return NextResponse.json(
        { success: false, message: error?.detail || 'Server error' },
        { status: 500 }
      );
    }
  };
}

export function makeRemove(cfg: CrudTableConfig) {
  return async function DELETE(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    if (!(await assertTableWritable(cfg, auth))) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    try {
      const { key } = await params;
      const keyValues = decodeKey(key);
      const whereParts = cfg.pk.map((c, i) => `${c} = $${i + 1}`);

      const result = await pool.query(
        `DELETE FROM ${cfg.table} WHERE ${whereParts.join(' AND ')} RETURNING *`,
        keyValues
      );

      if (result.rowCount === 0) {
        return NextResponse.json({ success: false, message: 'Record not found' }, { status: 404 });
      }

      await logAudit(auth, {
        table_name: cfg.table,
        action: 'delete',
        record_id: recordIdFrom(cfg, result.rows[0]),
      });

      return NextResponse.json({
        success: true,
        message: 'Deleted successfully',
        data: result.rows[0],
      });
    } catch (error: any) {
      console.error(`Delete ${cfg.table} Error:`, error);
      return NextResponse.json(
        { success: false, message: error?.detail || 'Delete failed' },
        { status: 500 }
      );
    }
  };
}
