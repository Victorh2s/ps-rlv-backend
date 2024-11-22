import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { DatabaseModule } from "../db/database.module";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { UpdateUserService } from "src/domain/services/user/update-user.service";
import { AuthenticateUserService } from "src/domain/services/user/authenticate-user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [UserController],
  providers: [RegisterUserService, UpdateUserService, AuthenticateUserService],
})
export class HttpModule {}
