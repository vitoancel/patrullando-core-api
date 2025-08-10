import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExamMasterCategoryRequest {
  @ApiProperty({
    description: 'Category ID a asosiar al Examen Maestro',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'Category id es requerido' })
  @IsNumber()
  category_id: number;

  @ApiProperty({
    description: 'Cantidad de preguntas de la Categoria para el Examen Maestro',
    example: 50,
    required: true,
  })
  @IsNotEmpty({ message: 'Cantidad de preguntas es requerido' })
  @IsNumber()
  num_question: number;

  @ApiProperty({
    description: 'Exam Master ID del Examen Maestro',
    example: 50,
    required: true,
  })
  @IsNotEmpty({ message: 'Exam Master ID es requerido' })
  @IsNumber()
  exam_master_id: number;
}
