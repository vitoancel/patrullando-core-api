import { Module } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatEntity } from './entities/format.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormatEntity]),AuthModule ],
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}
