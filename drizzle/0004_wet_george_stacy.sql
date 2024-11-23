ALTER TABLE "documents" ADD COLUMN "origem_documento" "DocumentEnum";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "DocumentEnum";