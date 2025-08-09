import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({
    description: 'Username for the new user',
    example: 'john.doe',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MaxLength(255, {
    message: 'El nombre de usuario no debe exceder los 255 caracteres',
  })
  username: string;

  @ApiProperty({
    description: 'Password for the new user',
    example: 'password123',
    required: true,
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MaxLength(255, {
    message: 'La contraseña no debe exceder los 255 caracteres',
  })
  password: string;

  @ApiProperty({
    description: 'Phone number for the new user',
    example: '+51987654321',
    required: true,
  })
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  @IsPhoneNumber('PE', {
    message: 'El número de teléfono debe tener un formato válido',
  })
  @MaxLength(36, {
    message: 'El número de teléfono no debe exceder los 36 caracteres',
  })
  phone_number: string;
}
