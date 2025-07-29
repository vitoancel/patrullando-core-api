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
import { QuestionService } from './question.service';
import { ListQuestionDto } from './dto/list-question.dto';
import { AllQuestionsResponse } from './responses/all-questions.response';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create() {
    return this.questionService.create();
  }

  @Get()
  async findAll(@Body() listQuestionDto: ListQuestionDto) {
    const response = new AllQuestionsResponse();

    response.data = await this.questionService.findAll(listQuestionDto);
    response.message = 'Questions found successfully';
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.questionService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
