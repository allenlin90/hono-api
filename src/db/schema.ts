import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const defaultNow = sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`;

export const tasks = sqliteTable('tasks', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  done: integer('done', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(defaultNow),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(defaultNow)
    .$onUpdate(() => new Date()),
});
