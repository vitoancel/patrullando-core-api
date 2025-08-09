import { BaseListRequest } from '../../utils/request';
import { CategoryEntity } from '../entities/category.entity';

export class ListCategoriesRequest extends BaseListRequest<CategoryEntity> {}
