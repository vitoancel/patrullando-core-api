import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamMasterService } from './exam-master.service';
import { CreateExamMasterDto } from './dto/create-exam-master.dto';
import { UpdateExamMasterDto } from './dto/update-exam-master.dto';
import { ListExamMasterDto } from './dto/list-exam-master.dto';

@Controller('exam-master')
export class ExamMasterController {
  constructor(private readonly examMasterService: ExamMasterService) {}

  @Post()
  create(@Body() createExamMasterDto: CreateExamMasterDto) {
    return this.examMasterService.create(createExamMasterDto);
  }

  @Get()
  findAll(@Body() listExamMaster: ListExamMasterDto) {
    return this.examMasterService.findAll(listExamMaster);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamMasterDto: UpdateExamMasterDto) {
    return this.examMasterService.update(+id, updateExamMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examMasterService.remove(+id);
  }
}
