import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import env from '@/env';
import * as schema from '@/db/schema';

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, {
  schema,
});

export default db;
