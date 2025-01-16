import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from '@repo/db';
import { ConfigService } from '@nestjs/config';
import { DrizzleAsyncProvider } from './drizzle.constants';
import { Database } from '~api/types';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.getOrThrow<string>('DATABASE_URL');
      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, { schema }) as Database;
    },
  },
];
