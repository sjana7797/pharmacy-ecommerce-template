import { createCategorySchema } from '@repo/schema';
import { createZodDto } from 'nestjs-zod';

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
export class UpdateCategoryDto extends createZodDto(
  createCategorySchema.partial(),
) {}
