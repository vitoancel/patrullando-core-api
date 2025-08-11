import { Injectable } from '@nestjs/common';
import { FormatEntity } from './entities/format.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ListFormatRequest } from './request/all-format.request';
import { FormatWithCategoryModel } from './models/format-with-category.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FormatsService {
  constructor(
    @InjectRepository(FormatEntity)
    private readonly formatRepository: Repository<FormatEntity>,
  ) {}

  async findAll(request: ListFormatRequest) {
    const repository: Repository<FormatEntity> = this.formatRepository;
    const { page = 1, limit = 10, sort = null, filters = null } = request;

    // Construir opciones de búsqueda
    const options: FindManyOptions<FormatEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined,
      relations: ['category'],
    };

    const data = await repository.find(options);
    const total_records = await repository.count(options);

    const dataMapped = plainToInstance(FormatWithCategoryModel, data);

    return { total_records, dataMapped };
  }
}
