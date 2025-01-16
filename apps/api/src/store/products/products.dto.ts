import { createProductSchema } from '@repo/schema';
import { createZodDto } from 'nestjs-zod';

export class CreateProductDto extends createZodDto(createProductSchema) {}
