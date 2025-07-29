import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeEntity } from './entities/practice.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeEntity]), AuthModule],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
