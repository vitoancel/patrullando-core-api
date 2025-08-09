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

  async findAll() {
    return await this.formatRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
