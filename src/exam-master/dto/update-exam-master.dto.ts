import { PartialType } from '@nestjs/mapped-types';
import { CreateExamMasterDto } from './create-exam-master.dto';

export class UpdateExamMasterDto extends PartialType(CreateExamMasterDto) {}
