import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListQuestionDto } from './dto/list-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async findAll(listQuestionDto: ListQuestionDto) {
    const {
      page = 1,
      limit = 10,
      sort = null,
      filters = null,
    } = listQuestionDto;

    // Construir opciones de búsqueda
    const options: FindManyOptions<QuestionEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined,
    };

    return await this.questionRepository.find({
      ...options,
      relations: ['options', 'category'],
    });
  }
}
