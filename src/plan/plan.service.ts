import { Injectable } from '@nestjs/common';
import { PlanEntity } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanRequest } from './request/create-plan.request';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  async create(
    createPlanRequest: CreatePlanRequest,
    user: any,
  ): Promise<boolean> {
    try {
      const newPlanObj = new PlanEntity();

      newPlanObj.title = createPlanRequest.title;
      newPlanObj.description = createPlanRequest.description;
      newPlanObj.type_currency = createPlanRequest.type_currency;
      newPlanObj.price = createPlanRequest.price;
      newPlanObj.color = createPlanRequest.color;
      newPlanObj.time_limit = createPlanRequest.time_limit;

      newPlanObj.creation_user = user.user_id;
      newPlanObj.creation_date = new Date();

      const newPlan = this.planRepository.create(newPlanObj);
      await this.planRepository.save(newPlan);

      return true;
    } catch (e) {
      console.log({ error: e.message });

      return false;
    }
  }

  async findAll() {
    return await this.planRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
