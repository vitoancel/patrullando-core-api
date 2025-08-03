import { Injectable, Logger } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from './entities/exam.entity';
import { Connection, FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { NewExamResponse } from './responses/new-exam.response';
import { OptionService } from 'src/option/option.service';
import { UpdateExamResponse } from './responses/update-exam.response';
import { ListQuestionDto } from 'src/question/dto/list-question.dto';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    private optionService: OptionService,
  ) {}

  async create(createExamDto: CreateExamDto, user: any) {
    const response = new NewExamResponse();
    try {
      const exam_master_id = createExamDto.exam_master_id;
      const user_id = user.user_id;
      const exam_id = null;

      const creation_result = await this.connection.query(
        'call create_exam($1, $2, $3);',
        [exam_master_id, user_id, exam_id],
      );

      response.status = true;
      response.message = 'Exam created successfully';
      response.data = await this.findExamWithQuestionsAndOptions(
        creation_result[0].v_exam_id,
      );

      return response;
    } catch (error) {
      this.logger.error(
        `Error executing stored procedure: ${error.message}`,
        error.stack,
      );

      response.status = false;
      response.message = 'Error creating exam';
      return response;
    }
  }

  async findAll(listQuestionDto: ListQuestionDto) {
    const {
      page = 1,
      limit = 10,
      sort = null,
      filters = null,
    } = listQuestionDto;

    // Construir opciones de búsqueda
    const options: FindManyOptions<ExamEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined,
    };

    return await this.examRepository.find(options);
  }

  async findAllByUser(listQuestionDto: ListQuestionDto, userId: number) {
    const { page = 1, limit = 10, sort = null } = listQuestionDto;

    // Construir opciones de búsqueda
    const options: FindManyOptions<ExamEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: { user: { id: userId }, end_date: Not(IsNull()) },
      relations: ['master'],
    };

    return await this.examRepository.find(options);
  }

  async findOne(id: number) {
    const response = new UpdateExamResponse();

    const exam_updated = await this.examRepository.findOne({
      where: { id: id },
      relations: ['master'],
    });

    response.status = true;
    response.message = `This action returns a #${id} exam`;
    response.data = exam_updated;
    return response;
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const response = new UpdateExamResponse();

    // Obtener todas las opciones por sus IDs desde la BD
    const optionIds = updateExamDto.options.map((opt) => opt.id);
    const existingOptions = await this.optionService.findByIds(optionIds);

    if (existingOptions.length !== updateExamDto.options.length) {
      response.status = false;
      response.message = 'Some options were not found.';
      return response;
    }

    await this.optionService.updateMasive(updateExamDto.options);

    await this.connection.query('call update_exam_results($1);', [id]);

    response.status = true;
    response.message = `Updated ${updateExamDto.options.length} options successfully`;

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }

  //////////////////////////////////////////
  async findExamWithQuestionsAndOptions(examId: number): Promise<ExamEntity> {
    try {
      return await this.examRepository.findOne({
        where: { id: examId },
        relations: [
          'questions',
          'master',
          'questions.category',
          'questions.options',
        ], // Load questions and their options
      });
    } catch (error) {
      this.logger.error(
        `Error fetching exam with questions and options: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
