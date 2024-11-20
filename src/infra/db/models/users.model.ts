import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { documentsTable } from "./documents.model";

export const usersTable = table("users", {
  ID: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  USERNAME: t.text().notNull(),
  EMAIL: t.text().notNull().unique(),
  PASSWORD: t.text().notNull(),
  CREATED_AT: t.timestamp().defaultNow().notNull(),
  UPDATED_AT: t.timestamp(),
  DELETED_AT: t.timestamp(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  documents: many(documentsTable),
}));
