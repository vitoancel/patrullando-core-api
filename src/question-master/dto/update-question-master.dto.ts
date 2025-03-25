import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionMasterDto } from './create-question-master.dto';

export class UpdateQuestionMasterDto extends PartialType(CreateQuestionMasterDto) {}
