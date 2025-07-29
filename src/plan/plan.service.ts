import { Injectable } from '@nestjs/common';
import { PlanEntity } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  create() {
    return 'This action adds a new plan';
  }

  async findAll() {
    return await this.planRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
