import { Module } from "@nestjs/common";
import { AuthModule } from "~api/core/auth/auth.module";
import { CustomersModule } from "~api/core/customers/customers.module";

@Module({
  imports: [AuthModule, CustomersModule],
})
export class CoreModule {}
