import { Injectable } from '@nestjs/common';
import { ListExamMasterDto } from './dto/list-exam-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamMasterEntity } from './entities/exam-master.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListExamMasterRequest } from './request/list-exam-master.request';

@Injectable()
export class ExamMasterService {
  constructor(
    @InjectRepository(ExamMasterEntity)
    private readonly examMasterRepository: Repository<ExamMasterEntity>,
  ) {}

  create() {
    return 'This action adds a new examMaster';
  }

  async findAll(
    listExamMaster: ListExamMasterRequest,
  ): Promise<ListExamMasterDto> {
    console.log({ listExamMaster });

    const {
      page = 1,
      limit = 10,
      sort = null,
      filters = null,
    } = listExamMaster;

    // Construir opciones de búsqueda
    const options: FindManyOptions<ExamMasterEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined,
    };

    const dataMapped = await this.examMasterRepository.find(options);
    const total_records = await this.examMasterRepository.count(options);

    return { total_records, dataMapped };
  }

  findOne(id: number) {
    return `This action returns a #${id} examMaster`;
  }

  update(id: number) {
    return `This action updates a #${id} examMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} examMaster`;
  }
}
