import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCategoriesRequest } from './requests/list-categories.request';
import { ListCategoriesResponse } from './responses/list-categories.response';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'CREATE',
    description: 'Create a new category',
  })
  @ApiResponse({ status: 201, description: 'Category created', type: CategoryEntity })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(createCategoryDto as Partial<CategoryEntity>);
  }

  @ApiOperation({
    summary: 'LIST',
    description: 'Retrieve a list of categories (paginated)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully',
    type: ListCategoriesResponse,
  })
  @Post('List')
  async findAllPaginated(
    @Body() listCategoriesRequest: ListCategoriesRequest,
  ): Promise<ListCategoriesResponse> {
    const response = new ListCategoriesResponse();
    const { total_records, dataMapped } =
      await this.categoryService.findAllPaginated(listCategoriesRequest);
    response.total_records = total_records;
    response.data = dataMapped;
    return response;
  }

  @ApiOperation({ summary: 'GET ALL', description: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'All categories retrieved', type: [CategoryEntity] })
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'GET ONE', description: 'Retrieve a category by id' })
  @ApiResponse({ status: 200, description: 'Category retrieved', type: CategoryEntity })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'UPDATE', description: 'Update a category by id' })
  @ApiResponse({ status: 200, description: 'Category updated', type: CategoryEntity })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(id, updateCategoryDto as Partial<CategoryEntity>);
  }

  @ApiOperation({
    summary: 'LIST BY EXAM',
    description: 'Retrieve a list of categories by exam master id (paginated)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully',
    type: ListCategoriesResponse,
  })
  @Post('ListByExamMasterId/:exam_master_id')
  async findAllByExamMasterId(
    @Body() listCategoriesRequest: ListCategoriesRequest,
    @Param('exam_master_id', ParseIntPipe) exam_master_id: number,
  ): Promise<ListCategoriesResponse> {
    const response = new ListCategoriesResponse();
    const { total_records, dataMapped } =
      await this.categoryService.findAllByExamIdPaginated(
        listCategoriesRequest,
        exam_master_id,
      );
    response.total_records = total_records;
    response.data = dataMapped;
    return response;
  }

  @ApiOperation({ summary: 'DELETE', description: 'Delete a category by id' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
