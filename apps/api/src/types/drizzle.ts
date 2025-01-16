import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '@repo/db';

export type Database = NodePgDatabase<typeof schema>;
