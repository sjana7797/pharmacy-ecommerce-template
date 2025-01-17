import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PaginationRequestDto } from "~api/common/dto/pagination.dto";
import { DrizzleAsyncProvider } from "~api/drizzle/drizzle.constants";
import { Database } from "~api/types";
import { schema } from "@repo/db";
import type { Product } from "@repo/db";
import { asc, eq } from "drizzle-orm";
import { GetAllResponse } from "~api/types/response";
import { CreateProductDto } from "./products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: Database,
  ) {}

  async getAllProducts(
    getAllItemPayload: PaginationRequestDto,
  ): Promise<GetAllResponse<Product>> {
    // payload
    const { limit, page } = getAllItemPayload;

    const take = limit + 1;
    const skip = (page - 1) * take;

    // query products
    let products = await this.db
      .select()
      .from(schema.products)
      .orderBy(asc(schema.products.name))
      .limit(take)
      .offset(skip);

    // check if products is empty
    if (!products?.length) {
      throw new NotFoundException("Products not found");
    }

    // check if there is more products
    let nextCursor: number | null = null;

    if (products.length > limit) {
      nextCursor = page + 1;
    }

    products = products.slice(0, limit);

    return {
      data: products,
      nextCursor,
      page,
      total: products.length,
    };
  }

  async getProductById(id: string): Promise<Product> {
    const products = await this.db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id));

    if (!products.length) {
      throw new NotFoundException(`Product with id : ${id} not found`);
    }

    return products[0];
  }

  async getProductBySlug(id: string): Promise<Product> {
    const products = await this.db
      .select()
      .from(schema.products)
      .where(eq(schema.products.slug, id));

    if (!products.length) {
      throw new NotFoundException(`Product with slug : ${id} not found`);
    }

    return products[0];
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      slug,
      sku,
      costPrice,
      sellingPrice,
      discountPrice,
      brandId,
      categoryIds,
    } = product;

    const productData = await this.db
      .insert(schema.products)
      .values({
        name,
        description,
        slug,
        sku,
        costPrice,
        sellingPrice,
        discountPrice,
        brandId,
        categoryIds,
      } as unknown as Product)
      .returning();

    if (!productData.length)
      throw new InternalServerErrorException("Product was not able to save");

    return productData[0];
  }
}
