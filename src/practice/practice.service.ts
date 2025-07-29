import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PracticeEntity } from './entities/practice.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreatePracticeResponse } from './responses/new_practice.response';

@Injectable()
export class PracticeService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(PracticeEntity)
    private readonly practiceRepository: Repository<PracticeEntity>,
  ) {}

  async create(createPracticeDto: CreatePracticeDto, user: any) {
    const response = new CreatePracticeResponse();
    try {
      const exam_master_id = createPracticeDto.exam_master_id;
      const user_id = user.user_id;

      let exams = await this.practiceRepository.find({
        where: { exam_master_id: exam_master_id, user_id: user_id },
        relations: ['exam'], // Load questions and their options
      });

      if (!exams.length) {
        const creation_result_practice_1 = await this.connection.query(
          'call create_practice_1($1, $2);',
          [exam_master_id, user_id],
        );
        const creation_result_practice_2 = await this.connection.query(
          'call create_practice_2($1, $2);',
          [exam_master_id, user_id],
        );
        const creation_result_practice_3 = await this.connection.query(
          'call create_practice_3($1, $2);',
          [exam_master_id, user_id],
        );
        const creation_result_practice_4 = await this.connection.query(
          'call create_practice_4($1, $2);',
          [exam_master_id, user_id],
        );

        exams = await this.practiceRepository.find({
          where: { exam_master_id: exam_master_id, user_id: user_id },
          relations: ['exam'], // Load questions and their options
        });

        response.data = exams;
      }

      response.message = 'Practices these exams.';
      response.data = exams;
      return response;
    } catch (error) {
      response.status = false;
      response.message = 'Error returns practices exams.';
      response.data = null;
      return response;
    }
  }

  async findAll() {
    return `This action returns all practice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} practice`;
  }

  update(id: number, updatePracticeDto: UpdatePracticeDto) {
    return `This action updates a #${id} practice`;
  }

  remove(id: number) {
    return `This action removes a #${id} practice`;
  }
}
