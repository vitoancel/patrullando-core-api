import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './create-exam.dto';

export class UpdateExamDto {
  options: Option[];
}

class Option {
  id: number;
  optionText: string;
  isCorrect: boolean;
  isMarked: boolean;
  points: number;
  orderNum: number;
}
