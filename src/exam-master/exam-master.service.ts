import { Injectable } from '@nestjs/common';
import { ListExamMasterDto } from './dto/list-exam-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamMasterEntity } from './entities/exam-master.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ExamMasterService {
  constructor(
    @InjectRepository(ExamMasterEntity)
    private readonly examMasterRepository: Repository<ExamMasterEntity>,
  ) {}

  create() {
    return 'This action adds a new examMaster';
  }

  async findAll(listExamMaster: ListExamMasterDto) {
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

    console.log({ options });

    return await this.examMasterRepository.find(options);
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
