import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionMasterService } from './question-master.service';

@Controller('question-master')
export class QuestionMasterController {
  constructor(private readonly questionMasterService: QuestionMasterService) {}

  @Post()
  create() {
    return this.questionMasterService.create();
  }

  @Get()
  findAll() {
    return this.questionMasterService.findAll();
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
