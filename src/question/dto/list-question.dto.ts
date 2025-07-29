import { BaseListRequest } from 'src/utils/request';
import { QuestionInterface } from '../interfaces/question.interface';

export class ListQuestionDto extends BaseListRequest<QuestionInterface> {}
