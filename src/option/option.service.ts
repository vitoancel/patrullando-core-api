import { Injectable } from '@nestjs/common';
import { OptionEntity } from './entities/option.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  findByIds(optionIds: number[]) {
    return this.optionRepository.findByIds(optionIds);
  }

  async updateMasive(options: any) {
    await this.optionRepository.save(options);
    return `This action updates was successful option`;
  }
}
