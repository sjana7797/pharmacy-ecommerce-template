import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PaginationTransformPipe } from '~api/common/pipes/pagination.pipe';
import { GetAllResponse } from '~api/types/response';
import { PaginationRequestDto } from '~api/common/dto/pagination.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import type { Category } from '@repo/db';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(
    @Query(new PaginationTransformPipe())
    getAllItemPayload: PaginationRequestDto,
  ): Promise<GetAllResponse<Category>> {
    return await this.categoriesService.getAllCategories(getAllItemPayload);
  }

  @Get('id/:id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.getCategoryBySlug(id);
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  @UsePipes(ZodValidationPipe)
  async updateCategory(
    @Body() category: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(category, id);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<Pick<Category, 'id'>[]> {
    return await this.categoriesService.deleteCategory(id);
  }
}
