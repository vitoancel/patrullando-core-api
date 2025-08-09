import { PaginationResponse } from 'src/utils/response';
import { ExamMasterEntity } from '../entities/exam-master.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AllExamsMasterResponse extends PaginationResponse<
  ExamMasterEntity[]
> {
  @ApiProperty({
    description: 'List of exam masters',
    type: [ExamMasterEntity],
    isArray: true,
  })
  override data?: ExamMasterEntity[];
}
