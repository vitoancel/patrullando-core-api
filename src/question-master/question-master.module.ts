import { Module } from '@nestjs/common';
import { QuestionMasterService } from './question-master.service';
import { QuestionMasterController } from './question-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionMasterEntity } from './entities/question-master.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionMasterEntity]), AuthModule],
  controllers: [QuestionMasterController],
  providers: [QuestionMasterService],
})
export class QuestionMasterModule {}
