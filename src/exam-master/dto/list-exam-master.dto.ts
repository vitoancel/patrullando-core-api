import { BasePaginationDto } from '../../utils/pagination.dto';
import { ExamMasterEntity } from '../entities/exam-master.entity';

export class ListExamMasterDto extends BasePaginationDto<ExamMasterEntity[]> {}
