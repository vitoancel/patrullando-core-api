import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListExamDto } from './dto/list-exam.dto';
import { AllExamsResponse } from './responses/all-exams.response';

@UseGuards(AuthGuard)
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto, @Request() req) {
    return this.examService.create(createExamDto, req.user);
  }

  @Get()
  async findAll(@Body() listExamDto: ListExamDto) {
    let response = new AllExamsResponse()
    
    response.data = await this.examService.findAll(listExamDto);
    response.message = 'Exams found successfully';
    return response;
  }

  @Get('by-user')
  async findAllByUser(@Body() listExamDto: ListExamDto, @Request() req) {
    let response = new AllExamsResponse()

    response.data = await this.examService.findAllByUser(listExamDto,req.user.user_id);

    response.message = 'Exams found successfully';
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExamDto: UpdateExamDto, @Request() req) {
    return this.examService.update(id, updateExamDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }
}
