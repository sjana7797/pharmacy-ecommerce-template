import { Module } from '@nestjs/common';
import { AuthModule } from '~api/core/auth/auth.module';
import { CustomersModule } from '~api/core/customers/customers.module';
import { UsersModule } from '~api/core/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule],
})
export class CoreModule {}
