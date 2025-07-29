// src/user/dto/user.dto.ts
import { Exclude, Expose } from 'class-transformer';

export class UserBaseModel {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  phone_number: string;

  @Expose()
  status: number;

  @Expose()
  creation_date: Date;

  @Expose()
  creation_user: number;

  @Expose()
  update_date: Date;

  @Expose()
  update_user: number;

  @Expose()
  current_plan;

  @Expose()
  suscription_since;

  @Expose()
  suscription_until;

  @Expose()
  role_id: number;

  @Exclude()
  password;

  @Exclude()
  deletion_date;

  @Exclude()
  deletion_user;
}
