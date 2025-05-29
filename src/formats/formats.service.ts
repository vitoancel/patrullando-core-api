import { Injectable } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { FormatEntity } from './entities/format.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormatsService {
  constructor(
      @InjectRepository(FormatEntity)
      private readonly formatRepository: Repository<FormatEntity>
    ) {}

  create(createFormatDto: CreateFormatDto) {
    return 'This action adds a new format';
  }

  async findAll() {
    return await this.formatRepository.find({
      order: {
        id: "ASC"
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} format`;
  }

  update(id: number, updateFormatDto: UpdateFormatDto) {
    return `This action updates a #${id} format`;
  }

  remove(id: number) {
    return `This action removes a #${id} format`;
  }
}
