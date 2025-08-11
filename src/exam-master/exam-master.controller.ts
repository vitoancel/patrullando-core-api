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
import { ExamMasterService } from './exam-master.service';
import { AllExamsMasterResponse } from './responses/all-exams-master.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListExamMasterRequest } from './request/list-exam-master.request';
import { CreateExamMasterRequest } from './request/create-exam-master.request';
import { CreateExamMasterResponse } from './responses/create-exam-master.response';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exam-master')
export class ExamMasterController {
  constructor(private readonly examMasterService: ExamMasterService) {}

  @Post()
  async create(@Body() request: CreateExamMasterRequest) {
    const response: CreateExamMasterResponse = new CreateExamMasterResponse();
    const hasBeenCreated = await this.examMasterService.create(request);

    if (!hasBeenCreated) {
      response.status = false;
      response.message = 'Ocurrió un error al crear el Examen Maestro';
      return response;
    }

    response.message = 'Examen Maestro creado con éxito';

    return response;
  }

  @Get()
  async findAll(@Body() listExamMaster: ListExamMasterRequest) {
    const response = new AllExamsMasterResponse();

    const { total_records, dataMapped } =
      await this.examMasterService.findAll(listExamMaster);

    response.data = dataMapped;
    response.total_records = total_records;

    return response;
  }

  @Post('list')
  async findAllWeb(@Body() listExamMaster: ListExamMasterRequest) {
    const response = new AllExamsMasterResponse();

    const { total_records, dataMapped } =
      await this.examMasterService.findAll(listExamMaster);

    response.data = dataMapped;
    response.total_records = total_records;

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.examMasterService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examMasterService.remove(+id);
  }
}
