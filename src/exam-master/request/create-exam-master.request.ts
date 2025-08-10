import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamMasterRequest {
  @ApiProperty({
    description: 'Nombre del Examen Maestro',
    example: 'exam master 1',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Descripcion del Examen Maestro',
    example: 'exam master 1',
    required: true,
  })
  @IsNotEmpty({ message: 'La descripcion es requerida' })
  description: string;

  @ApiProperty({
    description: 'Duracion del Examen Maestro',
    example: 120,
    required: true,
  })
  @IsNotEmpty({ message: 'La duracion es requerida' })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Puntaje Minimo del Examen Maestro',
    example: 50,
    required: true,
  })
  @IsNotEmpty({ message: 'El puntaje minimo es requerido' })
  @IsNumber()
  min_score: number;
}
