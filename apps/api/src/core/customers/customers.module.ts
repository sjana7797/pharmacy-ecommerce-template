import { Module } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { DrizzleModule } from "@/api/drizzle/drizzle.module";

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
  imports: [DrizzleModule],
})
export class CustomersModule {}
