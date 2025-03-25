  import { Injectable, Logger } from '@nestjs/common';
  import { CreateExamDto } from './dto/create-exam.dto';
  import { UpdateExamDto } from './dto/update-exam.dto';
  import { InjectConnection , InjectRepository} from '@nestjs/typeorm';
  import { ExamEntity } from './entities/exam.entity';
  import { Connection, FindManyOptions, Repository } from 'typeorm';
  import { QuestionEntity } from 'src/question/entities/question.entity';
  import { OptionEntity } from 'src/option/entities/option.entity';
import { UserService } from 'src/user/user.service';
import { QuestionService } from 'src/question/question.service';

  @Injectable()
  export class ExamService {

    private readonly logger = new Logger(ExamService.name);

    constructor(
      @InjectConnection() private connection: Connection,
      @InjectRepository(ExamEntity)
      private readonly examRepository: Repository<ExamEntity>
    ) {}

    async create(createExamDto: CreateExamDto) {
      try {
        let exam_master_id = createExamDto.exam_master_id;
        let user_id = 11;
        let exam_id = null;
        console.log({exam_master_id,user_id,exam_id})

        const result = await this.connection.query(
        'call create_exam($1, $2, $3);',[exam_master_id,user_id,exam_id]
        );

        console.log({result})

        let result2 = this.findExamWithQuestionsAndOptions(result[0].created_exam_id);

        return result2;
      } catch (error) {
        this.logger.error(`Error executing stored procedure: ${error.message}`, error.stack);
        throw error; // Re-throw the error so NestJS can handle it
      }
    }

    findAll() {
      return `This action returns all exam`;
    }

    findOne(id: number) {
      return `This action returns a #${id} exam`;
    }

    update(id: number, updateExamDto: UpdateExamDto) {
      return `This action updates a #${id} exam`;
    }

    remove(id: number) {
      return `This action removes a #${id} exam`;
    }



    //////////////////////////////////////////
    async findExamWithQuestionsAndOptions(examId: number): Promise<ExamEntity | undefined> {
      try {
        const exam = await this.examRepository.findOne({
          where: { id: examId },
          relations: ['questions', 'questions.options'], // Load questions and their options
        });
  
        return exam;
      } catch (error) {
        this.logger.error(`Error fetching exam with questions and options: ${error.message}`, error.stack);
        throw error;
      }
    }
  }
