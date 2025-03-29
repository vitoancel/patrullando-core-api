import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListQuestionDto } from './dto/list-question.dto';

@Injectable()
export class QuestionService {

    constructor(
      @InjectRepository(QuestionEntity)
      private readonly questionRepository: Repository<QuestionEntity>
    ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAll(listQuestionDto: ListQuestionDto) {

    const { page = 1, limit = 10, sort = null, filters = null } = listQuestionDto;

    // Construir opciones de búsqueda
    const options: FindManyOptions<QuestionEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined
    };

    return await this.questionRepository.find({
      ...options,
      relations: ['options', 'category']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
