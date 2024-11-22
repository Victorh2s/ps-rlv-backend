import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { documentsTable } from "./documents";

export const usersTable = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  username: t.text().notNull(),
  email: t.text().notNull().unique(),
  password: t.text().notNull(),
  created_at: t.timestamp().defaultNow().notNull(),
  updated_at: t.timestamp(),
  deleted_at: t.timestamp(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  documents: many(documentsTable),
}));
