import { Module } from '@nestjs/common';
import { drizzleProvider } from './drizzle.provider';
import { DrizzleAsyncProvider } from './drizzle.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
  imports: [ConfigModule],
})
export class DrizzleModule {}
