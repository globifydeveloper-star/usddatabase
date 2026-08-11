import 'server-only';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/db';
import { getAuthContext, sessionExpiredResponse } from '@/lib/auth';
import { logAudit } from '@/lib/audit';
import { createFirebaseUser } from '@/lib/firebase-sync';

// Bespoke (not the generic crud.ts factory) — must never select/return
// password_hash. Superadmins have full access; editors can list (GET) and
// create viewer-only accounts (POST) — see the role check below. Editing,
// deleting, permission grants, and force-logout stay superadmin-only,
// enforced both here and in middleware.ts.

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }
  if (auth.role !== 'superadmin' && auth.role !== 'editor') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * limit;

  try {
    const dataResult = await pool.query(
      `SELECT id, email, role, is_active, created_at, updated_at
       FROM cms_users
       WHERE email ILIKE $1
       ORDER BY id
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM cms_users WHERE email ILIKE $1`,
      [`%${search}%`]
    );

    return NextResponse.json({
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
    });
  } catch (error) {
    console.error('GET cms_users Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return sessionExpiredResponse();
  }
  if (auth.role !== 'superadmin' && auth.role !== 'editor') {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, password, role, is_active } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }
    const defaultRoles = ['superadmin', 'editor', 'viewer'];
    const { rows: dbRoles } = await pool.query('SELECT role_name FROM roles');
    const validRoles = new Set([
      ...defaultRoles,
      ...dbRoles.map((r) => r.role_name.trim().toLowerCase().replace(/\s+/g, '_')),
      ...dbRoles.map((r) => r.role_name.trim().toLowerCase()),
    ]);

    if (!validRoles.has(role.toLowerCase())) {
      return NextResponse.json({ success: false, message: 'Invalid role' }, { status: 400 });
    }
    if (auth.role === 'editor' && role !== 'viewer') {
      return NextResponse.json(
        { success: false, message: 'Admins can only create viewer accounts' },
        { status: 403 }
      );
    }

    const existing = await pool.query('SELECT id FROM cms_users WHERE email = $1', [email]);
    if ((existing.rowCount ?? 0) > 0) {
      return NextResponse.json(
        { success: false, message: 'A user with that email already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO cms_users (email, password_hash, role, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, is_active, created_at, updated_at`,
      [email, passwordHash, role, is_active ?? true]
    );

    // Automatically sync new SuperAdmin CMS user into Firebase Authentication (project usdegreeadmin)
    if (role.toLowerCase() === 'superadmin') {
      try {
        const fbResult = await createFirebaseUser(email, password);
        if (fbResult.firebaseUid) {
          await pool.query('UPDATE cms_users SET firebase_uid = $1 WHERE id = $2', [fbResult.firebaseUid, result.rows[0].id]).catch(() => {});
        }
      } catch (fbErr) {
        console.warn('[CMS User Create] Firebase sync warning:', fbErr);
      }
    }

    await logAudit(auth, {
      table_name: 'cms_users',
      action: 'create',
      record_id: result.rows[0].id,
    });

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Create cms_user Error:', error);
    return NextResponse.json(
      { success: false, message: error?.detail || 'Insert failed' },
      { status: 500 }
    );
  }
}
