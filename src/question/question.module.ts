import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity]), AuthModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
