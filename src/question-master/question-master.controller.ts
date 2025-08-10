import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionMasterService } from './question-master.service';
import { ListQuestionMasterRequest } from './request/list-question-master.request';
import { AllQuestionMastersResponse } from './responses/all-question-masters.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('question-master')
export class QuestionMasterController {
  constructor(private readonly questionMasterService: QuestionMasterService) {}

  @Post()
  create() {
    return this.questionMasterService.create();
  }

  @Post('list')
  async findAll(@Body() listDto: ListQuestionMasterRequest) {
    const response = new AllQuestionMastersResponse();
    const { total_records, dataMapped } =
      await this.questionMasterService.findAll(listDto);
    response.total_records = total_records;
    response.data = dataMapped;
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.questionMasterService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionMasterService.remove(+id);
  }
}
