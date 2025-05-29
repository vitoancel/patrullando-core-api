import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeEntity } from './entities/practice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeEntity]) ],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
