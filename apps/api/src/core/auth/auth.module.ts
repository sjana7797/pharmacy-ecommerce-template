import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomersModule } from '../customers/customers.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CustomersModule],
})
export class AuthModule {}
