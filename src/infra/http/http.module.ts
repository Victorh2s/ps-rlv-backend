import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { DatabaseModule } from "../db/database.module";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { UpdateUserService } from "src/domain/services/user/update-user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [RegisterUserService, UpdateUserService],
})
export class HttpModule {}
