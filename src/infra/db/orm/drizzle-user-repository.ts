import { Inject, Injectable } from "@nestjs/common";
import {
  IRegisterUser,
  UserRepository,
} from "src/domain/repositories/user-repository";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema/users";
import { eq, or } from "drizzle-orm";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(
    @Inject("DATABASE_CONNECTION") private db: NodePgDatabase<typeof schema>,
  ) {}

  async registerUser(newUser: IRegisterUser) {
    await this.db.insert(schema.usersTable).values(newUser);

    return;
  }

  async findUserByEmailOrUsername(email: string, username: string) {
    const user = await this.db
      .select()
      .from(schema.usersTable)
      .where(
        or(
          eq(schema.usersTable.email, email),
          eq(schema.usersTable.username, username),
        ),
      )
      .limit(1);
    return user[0];
  }

  async findUserById(userId: number) {
    const user = await this.db
      .select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.id, userId))
      .limit(1);
    return user[0];
  }

  async updateUserUsername(newUsername: string, userId: number) {
    await this.db
      .update(schema.usersTable)
      .set({ username: newUsername })
      .where(eq(schema.usersTable.id, userId));

    return;
  }

  async findUserByEmail(email: string) {
    const user = await this.db
      .select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email))
      .limit(1);
    return user[0];
  }
}
