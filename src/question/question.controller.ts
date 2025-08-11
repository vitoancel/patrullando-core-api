import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ListQuestionDto } from './dto/list-question.dto';
import { AllQuestionsResponse } from './responses/all-questions.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll(@Body() listQuestionDto: ListQuestionDto) {
    const response = new AllQuestionsResponse();

    response.data = await this.questionService.findAll(listQuestionDto);
    response.message = 'Questions found successfully';
    return response;
  }
}
