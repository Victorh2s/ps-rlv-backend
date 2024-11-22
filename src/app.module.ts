import { Module } from "@nestjs/common";
import { DatabaseModule } from "./infra/db/database.module";
import { HttpModule } from "./infra/http/http.module";

import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
  ],
})
export class AppModule {}
