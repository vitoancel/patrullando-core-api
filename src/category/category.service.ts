import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ListCategoriesRequest } from './requests/list-categories.request';
import { ListCategoriesPaginationDto } from './dto/list-category.dto';
import { ExamMasterCategoryEntity } from './entities/exam-master-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ExamMasterCategoryEntity)
    private readonly examMasterCategoryRepository: Repository<ExamMasterCategoryEntity>,
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

  async findAllByExamIdPaginated(
    request: ListCategoriesRequest,
    exam_master_id: number,
  ): Promise<ListCategoriesPaginationDto> {
    const { page = 1, limit = 10, sort = null, filters = null } = request;

    const categoriesByExam = await this.examMasterCategoryRepository.find({
      select: { category: { id: true } },
      where: { examMaster: { id: exam_master_id } },
    });

    console.log({ categoriesByExam });

    // Transforma el array de objetos a un array de números
    const categoryIds: number[] = categoriesByExam.map(
      (record) => record.id,
    );

    const whereCondition = {
      ...filters,
      id: In(categoryIds), // Usa el operador 'In' para filtrar por el array de IDs
    };

    const options: FindManyOptions<CategoryEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? (sort as any) : undefined,
      where: whereCondition,
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
