import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){
    nombre_usuario: Text;
    contraseña: Text;
    correo_electronico: Text
  }
