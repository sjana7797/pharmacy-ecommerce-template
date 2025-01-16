import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { schema, type Category } from '@repo/db';
import { asc, eq, inArray } from 'drizzle-orm';
import { PaginationRequestDto } from '~api/common/dto/pagination.dto';
import { DrizzleAsyncProvider } from '~api/drizzle/drizzle.constants';
import { Database } from '~api/types';
import { GetAllResponse } from '~api/types/response';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: Database,
    private logger: Logger,
  ) {}

  async getAllCategories(
    getAllItemPayload: PaginationRequestDto,
  ): Promise<GetAllResponse<Category>> {
    // payload
    const { limit, page } = getAllItemPayload;

    const take = limit + 1;
    const skip = (page - 1) * take;

    this.logger.log('Get All Categories');

    // query categories
    let categories = await this.db
      .select()
      .from(schema.categories)
      .orderBy(asc(schema.categories.name))
      .limit(take)
      .offset(skip);

    // check if categories is empty
    if (!categories?.length) {
      throw new NotFoundException('Categories not found');
    }

    // check if there is more products
    let nextCursor: number | null = null;

    if (categories.length > limit) {
      nextCursor = page + 1;
    }

    categories = categories.slice(0, limit);

    return {
      data: categories,
      nextCursor,
      page,
      total: categories.length,
    };
  }

  async getCategoryById(id: string): Promise<Category> {
    const categories = await this.db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.id, id));

    if (!categories.length) {
      throw new NotFoundException(`categories with id : ${id} not found`);
    }

    return categories[0];
  }

  async getCategoryBySlug(id: string): Promise<Category> {
    const categories = await this.db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.slug, id));

    if (!categories.length) {
      throw new NotFoundException(`categories with slug : ${id} not found`);
    }

    return categories[0];
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const { name, description, slug, parentId } = category;

    const categoryData = await this.db
      .insert(schema.categories)
      .values({
        name,
        description,
        slug,
        parentId,
      } as unknown as Category)
      .returning();

    if (!categoryData.length)
      throw new InternalServerErrorException('Category was not able to save');

    return categoryData[0];
  }

  async updateCategory(
    category: UpdateCategoryDto,
    id: string,
  ): Promise<Category> {
    const categoryData = await this.db
      .update(schema.categories)
      .set(category)
      .where(eq(schema.categories.id, id))
      .returning();

    if (!categoryData.length)
      throw new InternalServerErrorException('Category was unable to save');

    return categoryData[0];
  }

  async deleteCategory(id: string): Promise<Pick<Category, 'id'>[]> {
    const getAllCategoriesRelatedToCategory = await this.db
      .select({
        id: schema.categories.id,
      })
      .from(schema.categories)
      .where(eq(schema.categories.parentId, id));

    const categoryIds = getAllCategoriesRelatedToCategory.map((c) => c.id);

    categoryIds.push(id);

    const categoryData = await this.db
      .update(schema.categories)
      .set({ isDeleted: true })
      .where(inArray(schema.categories.id, categoryIds))
      .returning({ id: schema.categories.id });

    if (!categoryData.length)
      throw new InternalServerErrorException('Category was unable to delete');

    return categoryData;
  }
}
