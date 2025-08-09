import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { AllPlansResponse } from './responses/all-plans.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePlanRequest } from './request/create-plan.request';
import { CreatePlanResponse } from './responses/create-plan.response';

@UseGuards(AuthGuard)
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async create(@Body() createPlanRequest: CreatePlanRequest, @Request() req) {
    const response: CreatePlanResponse = new CreatePlanResponse();
    const newPlan = await this.planService.create(createPlanRequest, req.user);

    if (!newPlan) {
      response.status = false;
      response.message = 'Ocurrió un error al crear el plan';
      return response;
    }

    response.message = 'Plan creado con éxito';

    return response;
  }

  @Get()
  async findAll() {
    const response = new AllPlansResponse();

    response.data = await this.planService.findAll();

    return response;
  }
}
