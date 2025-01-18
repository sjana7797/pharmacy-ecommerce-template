import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { PaginationRequestDto } from "@/api/common/dto/pagination.dto";
import type { Product } from "@repo/db";
import { GetAllResponse } from "@/api/types/response";
import { ZodValidationPipe } from "nestjs-zod";
import { CreateProductDto } from "./products.dto";
import { PaginationTransformPipe } from "@/api/common/pipes/pagination.pipe";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query(new PaginationTransformPipe())
    getAllItemPayload: PaginationRequestDto,
  ): Promise<GetAllResponse<Product>> {
    return await this.productsService.getAllProducts(getAllItemPayload);
  }

  @Get("id/:id")
  async getProductById(@Param("id") id: string): Promise<Product> {
    return await this.productsService.getProductById(id);
  }

  @Get(":id")
  async getProduct(@Param("id") id: string): Promise<Product> {
    return await this.productsService.getProductBySlug(id);
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.createProduct(product);
  }
}
