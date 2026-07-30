import 'server-only';
import { NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { KNOWN_CRUD_TABLES } from '@/lib/cms-tables';

export async function GET(request: Request) {
  const auth = await getAuthContext(request);
  if (!auth || auth.role !== 'superadmin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ tables: KNOWN_CRUD_TABLES });
}
