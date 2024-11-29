import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { lower } from '../../drizzle/drizzle.helper';

export const users = pgTable(
    'users',
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        email: varchar({ length: 320 }).notNull(),
        password: varchar({ length: 100 }).notNull(),
    },
    (table) => [uniqueIndex('emailUniqueIndex').on(lower(table.email))],
);

export type User = typeof users.$inferSelect;
