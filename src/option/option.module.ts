import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { OptionEntity } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  controllers: [OptionController],
  exports: [OptionService],
  providers: [OptionService],
})
export class OptionModule {}
