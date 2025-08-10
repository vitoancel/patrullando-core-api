import { PaginationResponse } from 'src/utils/response';
import { QuestionMasterEntity } from '../entities/question-master.entity';

export class AllQuestionMastersResponse extends PaginationResponse<
  QuestionMasterEntity[]
> {}
