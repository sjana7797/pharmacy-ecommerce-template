import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationRequestDto } from '~api/common/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PaginationTransformPipe implements PipeTransform {
  async transform(dto: PaginationRequestDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }

    return plainToInstance(metatype, dto);
  }
}
