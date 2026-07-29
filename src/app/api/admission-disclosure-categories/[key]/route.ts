import { makeUpdate, makeRemove } from '@/lib/crud';
import { cfg } from '../config';

export const PUT = makeUpdate(cfg);
export const DELETE = makeRemove(cfg);
