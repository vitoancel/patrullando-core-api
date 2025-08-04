import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FormatsService } from './formats.service';
import { AllFormatsResponse } from './responses/all-formats.response';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Post()
  create() {
    return this.formatsService.create();
  }

  @Get()
  async findAll() {
    const response = new AllFormatsResponse();

    response.data = await this.formatsService.findAll();

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.formatsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatsService.remove(+id);
  }
}
