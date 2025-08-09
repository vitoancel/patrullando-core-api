import { PaginationResponse } from '../../utils/response';
import { CategoryEntity } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ListCategoriesResponse extends PaginationResponse<
  CategoryEntity[]
> {
  @ApiProperty({
    description: 'List of categories',
    type: [CategoryEntity],
    isArray: true,
  })
  override data?: CategoryEntity[];
}
