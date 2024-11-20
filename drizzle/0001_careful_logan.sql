CREATE TABLE IF NOT EXISTS "documents" (
	"ID" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "documents_ID_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
CREATE TABLE IF NOT EXISTS "users" (
	"ID" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_ID_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"USERNAME" text NOT NULL,
	"EMAIL" text NOT NULL,
	"PASSWORD" text NOT NULL,
	"CREATED_AT" timestamp DEFAULT now() NOT NULL,
	"UPDATED_AT" timestamp,
	"DELETED_AT" timestamp,
	CONSTRAINT "users_EMAIL_unique" UNIQUE("EMAIL")
);
--> statement-breakpoint
DROP TABLE "document" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
DROP TYPE "public"."roles";