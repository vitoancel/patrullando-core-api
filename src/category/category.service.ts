import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ListCategoriesRequest } from './requests/list-categories.request';
import { ListCategoriesPaginationDto } from './dto/list-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllPaginated(
    request: ListCategoriesRequest,
  ): Promise<ListCategoriesPaginationDto> {
    const { page = 1, limit = 10, sort = null, filters = null } = request;

    const options: FindManyOptions<CategoryEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? (sort as any) : undefined,
      where: filters ? (filters as any) : undefined,
    };

    const data = await this.categoryRepository.find(options);
    const total_records: number = await this.categoryRepository.count(options);

    return { total_records, dataMapped: data };
  }

  // Placeholder methods (not used in current listing pattern)
  create() {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
