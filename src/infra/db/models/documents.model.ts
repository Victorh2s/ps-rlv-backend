import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersTable } from "./users.model";

export const documentsTable = table("documents", {
  ID: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  NOME_DOCUMENTO: t.text(),
  TIPO_DOCUMENTO: t.text(),
  ORIGEM_DOCUMENTO: t.text(),
  EMITENTE: t.text(),
  VALOR_TRIBUTO: t.decimal({ precision: 10, scale: 2 }),
  VALOR_LIQUIDO: t.decimal({ precision: 10, scale: 2 }),
  ANEXO_DOCUMENTO: t.text(),
  CREATED_AT: t.timestamp().defaultNow().notNull(),
  UPDATED_AT: t.timestamp(),
  DELETED_AT: t.timestamp(),
  USER_ID: t.integer("user_id"),
});

export const documentsRelations = relations(documentsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [documentsTable.USER_ID],
    references: [usersTable.ID],
  }),
}));
