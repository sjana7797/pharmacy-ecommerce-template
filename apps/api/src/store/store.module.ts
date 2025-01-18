import { Module } from "@nestjs/common";
import { BrandsModule } from "@/api/store/brands/brands.module";
import { CartsModule } from "@/api/store/carts/carts.module";
import { CategoriesModule } from "@/api/store/categories/categories.module";
import { OrdersModule } from "@/api/store/orders/orders.module";
import { ProductsModule } from "@/api/store/products/products.module";

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    CartsModule,
    BrandsModule,
    CategoriesModule,
  ],
})
export class StoreModule {}
