import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { StoreModule } from "./store/store.module";
import { LoggerModule } from "nestjs-pino";
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    DrizzleModule,
    StoreModule,
    CoreModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
