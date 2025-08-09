import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequest {
  @ApiProperty({
    description: 'Nombre de usuario. Opcional.',
    example: 'john.doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  username?: string;

  @ApiProperty({
    description: 'Contraseña del usuario. Opcional.',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;

  @ApiProperty({
    description:
      'Número de teléfono. Opcional. Debe ser un número de teléfono válido.',
    example: '+51987654321',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber('PE') // Asumiendo Perú, puedes cambiar 'PE' por el código del país que necesites.
  @MaxLength(36)
  phone_number?: string;

  @ApiProperty({
    description:
      'Estado del usuario (1 para activo, 0 para inactivo). Opcional.',
    example: 1,
    required: false,
    minimum: 0,
    maximum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  status?: number;

  @ApiProperty({
    description: 'ID del rol del usuario. Opcional.',
    example: 2,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  role_id?: number;

  @ApiProperty({
    description: 'ID del plan del usuario. Opcional.',
    example: 2,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  plan_id?: number;

  @ApiProperty({
    description:
      'Fecha de finalización de la suscripción del usuario. Opcional.',
    example: '2025-12-31T23:59:59Z',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  suscription_until?: Date;
}
