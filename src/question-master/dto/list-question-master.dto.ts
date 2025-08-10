import { BasePaginationDto } from '../../utils/pagination.dto';
import { QuestionMasterEntity } from '../entities/question-master.entity';

export class ListQuestionMasterPaginationDto extends BasePaginationDto<
  QuestionMasterEntity[]
> {}
