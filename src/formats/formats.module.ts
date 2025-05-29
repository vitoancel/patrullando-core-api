import { Module } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatEntity } from './entities/format.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatEntity]) ],
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}
