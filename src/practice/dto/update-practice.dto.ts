import { PartialType } from '@nestjs/mapped-types';

export class UpdatePracticeDto {
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