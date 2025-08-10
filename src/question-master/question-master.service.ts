import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { QuestionMasterEntity } from './entities/question-master.entity';
import { ListQuestionMasterRequest } from './request/list-question-master.request';
import { ListQuestionMasterPaginationDto } from './dto/list-question-master.dto';

@Injectable()
export class QuestionMasterService {
  constructor(
    @InjectRepository(QuestionMasterEntity)
    private readonly questionMasterRepository: Repository<QuestionMasterEntity>,
  ) {}

  create() {
    return 'This action adds a new questionMaster';
  }

  async findAll(listDto: ListQuestionMasterRequest) {
    const response: ListQuestionMasterPaginationDto =
      new ListQuestionMasterPaginationDto();
    const { page = 1, limit = 10, sort = null, filters = null } = listDto;

    const options: FindManyOptions<QuestionMasterEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? (sort as any) : undefined,
      where: filters ? (filters as any) : undefined,
    };

    const data = await this.questionMasterRepository.find({
      ...options,
      relations: ['options', 'category'],
    });

    response.total_records = await this.questionMasterRepository.count(options);
    response.dataMapped = data;
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionMaster`;
  }

  update(id: number) {
    return `This action updates a #${id} questionMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionMaster`;
  }
}
