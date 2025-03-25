import { Injectable } from '@nestjs/common';
import { CreateExamMasterDto } from './dto/create-exam-master.dto';
import { UpdateExamMasterDto } from './dto/update-exam-master.dto';
import { ListExamMasterDto } from './dto/list-exam-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamMasterEntity } from './entities/exam-master.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ExamMasterService {

  constructor(
    @InjectRepository(ExamMasterEntity)
    private readonly examMasterRepository: Repository<ExamMasterEntity>
  ) {}

  create(createExamMasterDto: CreateExamMasterDto) {
    return 'This action adds a new examMaster';
  }

  async findAll(listExamMaster: ListExamMasterDto) {

    const { page = 1, limit = 10, sort = null, filters = null } = listExamMaster;

    // Construir opciones de búsqueda
    const options: FindManyOptions<ExamMasterEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined
  };

    return await this.examMasterRepository.find(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} examMaster`;
  }

  update(id: number, updateExamMasterDto: UpdateExamMasterDto) {
    return `This action updates a #${id} examMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} examMaster`;
  }
}
