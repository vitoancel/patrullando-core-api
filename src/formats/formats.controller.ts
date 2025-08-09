import { Controller, Get, UseGuards } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { AllFormatsResponse } from './responses/all-formats.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Get()
  async findAll() {
    const response = new AllFormatsResponse();

    response.data = await this.formatsService.findAll();

    return response;
  }
}
