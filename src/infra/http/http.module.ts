import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { DatabaseModule } from "../db/database.module";
import { RegisterUserService } from "src/domain/services/user/register-user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [RegisterUserService],
})
export class HttpModule {}
