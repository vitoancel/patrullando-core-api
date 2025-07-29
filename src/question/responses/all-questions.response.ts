import { BaseResponse } from 'src/utils/response';
import { QuestionEntity } from '../entities/question.entity';

export class AllQuestionsResponse extends BaseResponse<QuestionEntity[]> {}
