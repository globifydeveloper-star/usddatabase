import { makeList, makeCreate } from '@/lib/crud';
import { cfg } from './config';

export const GET = makeList(cfg);
export const POST = makeCreate(cfg);
