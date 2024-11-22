import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { UserRepository } from "src/domain/repositories/user-repository";
import { DrizzleUserRepository } from "./orm/drizzle-user-repository";

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
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
