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

  create() {
    return 'This action adds a new option';
  }

  findAll() {
    return `This action returns all option`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  findByIds(optionIds: number[]) {
    return this.optionRepository.findByIds(optionIds);
  }

  update(id: number) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }

  async updateMasive(options: any) {
    await this.optionRepository.save(options);
    return `This action updates was successful option`;
  }
}
