import { PaginationResponse } from 'src/utils/response';
import { FormatWithCategoryModel } from '../models/format-with-category.model';

export class AllFormatResponse extends PaginationResponse<
  FormatWithCategoryModel[]
> {}
