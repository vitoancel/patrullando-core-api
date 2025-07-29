import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamMasterService } from './exam-master.service';
import { CreateExamMasterDto } from './dto/create-exam-master.dto';
import { UpdateExamMasterDto } from './dto/update-exam-master.dto';
import { ListExamMasterDto } from './dto/list-exam-master.dto';
import { AllExamsMasterResponse } from './responses/all-exams-master.response';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('exam-master')
export class ExamMasterController {
  constructor(private readonly examMasterService: ExamMasterService) {}

  @Post()
  create(@Body() createExamMasterDto: CreateExamMasterDto) {
    return this.examMasterService.create(createExamMasterDto);
  }

  @Get()
  async findAll(@Body() listExamMaster: ListExamMasterDto) {
    const response = new AllExamsMasterResponse();

    response.data = await this.examMasterService.findAll(listExamMaster);

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examMasterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamMasterDto: UpdateExamMasterDto,
  ) {
    return this.examMasterService.update(+id, updateExamMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examMasterService.remove(+id);
  }
}
