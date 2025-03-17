import { Module } from '@nestjs/common';
import { ExamMasterService } from './exam-master.service';
import { ExamMasterController } from './exam-master.controller';
import { ExamMasterEntity } from './entities/exam-master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExamMasterEntity]) ],
  controllers: [ExamMasterController],
  providers: [ExamMasterService],
})
export class ExamMasterModule {}
