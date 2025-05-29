import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { QuestionModule } from 'src/question/question.module';
import { OptionModule } from 'src/option/option.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from './entities/exam.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { OptionEntity } from 'src/option/entities/option.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    OptionModule,AuthModule,
    TypeOrmModule.forFeature([ExamEntity]), // Register your entities
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
