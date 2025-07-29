import { Injectable } from '@nestjs/common';
import { FormatEntity } from './entities/format.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormatsService {
  constructor(
    @InjectRepository(FormatEntity)
    private readonly formatRepository: Repository<FormatEntity>,
  ) {}

  create() {
    return 'This action adds a new format';
  }

  async findAll() {
    return await this.formatRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} format`;
  }

  update(id: number) {
    return `This action updates a #${id} format`;
  }

  remove(id: number) {
    return `This action removes a #${id} format`;
  }
}
