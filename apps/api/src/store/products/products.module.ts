import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DrizzleModule } from '~api/drizzle/drizzle.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DrizzleModule],
})
export class ProductsModule {}
