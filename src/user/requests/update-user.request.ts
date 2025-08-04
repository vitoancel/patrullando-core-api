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

export class UpdateUserRequest {
  /**
   * Nombre de usuario. Opcional.
   * @example "nuevo_usuario"
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  username?: string;

  /**
   * Contraseña del usuario. Opcional.
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;

  /**
   * Número de teléfono. Opcional.
   * Debe ser un número de teléfono válido.
   * @example "+51987654321"
   */
  @IsOptional()
  @IsPhoneNumber('PE') // Asumiendo Perú, puedes cambiar 'PE' por el código del país que necesites.
  @MaxLength(36)
  phone_number?: string;

  /**
   * Estado del usuario (1 para activo, 0 para inactivo). Opcional.
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  status?: number;

  /**
   * ID del rol del usuario. Opcional.
   * @example 2
   */
  @IsOptional()
  @IsInt()
  role_id?: number;

  /**
   * ID del plan del usuario. Opcional.
   * @example 2
   */
  @IsOptional()
  @IsInt()
  plan_id?: number;

  @IsOptional()
  @IsDate()
  suscription_until?: Date;
}
