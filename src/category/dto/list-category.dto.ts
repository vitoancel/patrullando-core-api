import { CategoryEntity } from '../entities/category.entity';
import { BasePaginationDto } from '../../utils/pagination.dto';

export class ListCategoriesPaginationDto extends BasePaginationDto<
  CategoryEntity[]
> {}
