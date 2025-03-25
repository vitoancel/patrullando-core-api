import { Module } from '@nestjs/common';
import { QuestionMasterService } from './question-master.service';
import { QuestionMasterController } from './question-master.controller';

@Module({
  controllers: [QuestionMasterController],
  providers: [QuestionMasterService],
})
export class QuestionMasterModule {}
