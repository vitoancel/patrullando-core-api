import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCategoriesRequest } from './requests/list-categories.request';
import { ListCategoriesResponse } from './responses/list-categories.response';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'LIST',
    description: 'Retrieve a list of categories',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully',
    type: ListCategoriesResponse,
  })
  @Post('List')
  async findAll(
    @Body() listCategoriesRequest: ListCategoriesRequest,
  ): Promise<ListCategoriesResponse> {
    const response = new ListCategoriesResponse();
    const { total_records, dataMapped } =
      await this.categoryService.findAllPaginated(listCategoriesRequest);
    response.total_records = total_records;
    response.data = dataMapped;
    return response;
  }
}
