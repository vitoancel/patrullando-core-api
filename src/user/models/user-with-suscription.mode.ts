import { UserBaseModel } from './user-base.model';
import { Exclude, Expose } from 'class-transformer';

export class UserWithSuscriptionModel extends UserBaseModel {
  @Expose()
  id;

  @Expose()
  username;

  @Expose()
  status;

  @Expose()
  status_name;

  @Expose()
  suscription_type;

  @Expose()
  suscription_type_id;

  @Expose()
  suscription_detail;

  // Exclude Keys
  @Exclude()
  phone_number;

  @Exclude()
  role;

  @Exclude()
  creation_date;

  @Exclude()
  creation_user;

  @Exclude()
  update_date;

  @Exclude()
  update_user;

  @Exclude()
  role_id;
}
