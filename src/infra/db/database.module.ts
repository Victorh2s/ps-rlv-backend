import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Module({
  imports: [],
  providers: [
    {
      provide: "DATABASE_CONNECTION",
      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        const db = drizzle({ client: pool });

        return db;
      },
    },
  ],
  exports: ["DATABASE_CONNECTION"],
})
export class DatabaseModule {}
