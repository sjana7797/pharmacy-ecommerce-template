import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CustomersModule,
    AuthModule,
    DrizzleModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
