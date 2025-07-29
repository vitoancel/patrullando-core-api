// src/user/dto/user.dto.ts
import { Exclude } from 'class-transformer';

export class UserWithSuscriptionInterface {
  id: number;
  username: string;

  @Exclude() // Explicitly exclude password for this DTO by default
  password: string;

  phone_number: string;
  status: number;
  creation_date: Date;
  creation_user: number;
  update_date: Date;
  update_user: number;
  deletion_date: Date;
  deletion_user: number;
  role_id: number;
}
