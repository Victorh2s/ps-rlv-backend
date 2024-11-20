CREATE TYPE "public"."roles" AS ENUM('guest', 'user', 'admin');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"ID" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "document_ID_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"NOME_DOCUMENTO" text,
	"TIPO_DOCUMENTO" text,
	"ORIGEM_DOCUMENTO" text,
	"EMITENTE" text,
	"VALOR_TRIBUTO" numeric(10, 2),
	"VALOR_LIQUIDO" numeric(10, 2),
	"ANEXO_DOCUMENTO" text,
	"CREATED_AT" timestamp DEFAULT now() NOT NULL,
	"UPDATED_AT" timestamp,
	"DELETED_AT" timestamp,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"ID" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_ID_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"USERNAME" text NOT NULL,
	"EMAIL" text NOT NULL,
	"PASSWORD" text NOT NULL,
	"CREATED_AT" timestamp DEFAULT now() NOT NULL,
	"UPDATED_AT" timestamp,
	"DELETED_AT" timestamp,
	CONSTRAINT "user_EMAIL_unique" UNIQUE("EMAIL")
);
