import { Injectable, NotFoundException } from '@nestjs/common';
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
    const categoryIds: number[] = categoriesByExam.map((record) => record.id);

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

  // CRUD methods for Category
  async create(payload: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const entity = this.categoryRepository.create(payload as CategoryEntity);
    return this.categoryRepository.save(entity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return entity;
  }

  async update(
    id: number,
    payload: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const entity = await this.findOne(id);
    const merged = this.categoryRepository.merge(entity, payload);
    return this.categoryRepository.save(merged);
  }

  async remove(id: number): Promise<void> {
    // Remove relations to avoid FK constraint issues
    await this.examMasterCategoryRepository
      .createQueryBuilder()
      .delete()
      .from(ExamMasterCategoryEntity)
      .where('category_id = :id', { id })
      .execute();

    const result = await this.categoryRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
