import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequest {
  @ApiProperty({
    description: 'Username for authentication',
    example: '01960d02-5008-726d-a879-f15715d9444d',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  username: string;

  @ApiProperty({
    description: 'Password for authentication',
    example: '01960d02-5008-726d-a879-f15715d9444d',
    required: true,
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;
}
