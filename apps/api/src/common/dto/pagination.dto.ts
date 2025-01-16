import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number = 10;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page: number = 1;
}
