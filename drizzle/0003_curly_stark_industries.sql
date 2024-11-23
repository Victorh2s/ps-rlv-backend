ALTER TABLE "documents" ADD COLUMN "DocumentEnum" "DocumentEnum";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "origem_documento";