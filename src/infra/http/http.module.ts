import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { DatabaseModule } from "../db/database.module";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { UpdateUserService } from "src/domain/services/user/update-user.service";
import { AuthenticateUserService } from "src/domain/services/user/authenticate-user.service";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";
import { DocumentController } from "./controllers/document.controller";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [UserController, DocumentController],
  providers: [RegisterUserService, UpdateUserService, AuthenticateUserService],
})
export class HttpModule {}
