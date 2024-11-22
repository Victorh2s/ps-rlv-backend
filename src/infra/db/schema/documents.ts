import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const documentsTable = table("documents", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  nome_documento: t.text(),
  tipo_documento: t.text(),
  origem_documento: t.text(),
  emitente: t.text(),
  valor_tributo: t.decimal({ precision: 10, scale: 2 }),
  valor_liquido: t.decimal({ precision: 10, scale: 2 }),
  anexo_documento: t.text(),
  created_at: t.timestamp().defaultNow().notNull(),
  updated_at: t.timestamp(),
  deleted_at: t.timestamp(),
  user_id: t.integer("user_id"),
});

export const documentsRelations = relations(documentsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [documentsTable.user_id],
    references: [usersTable.id],
  }),
}));
