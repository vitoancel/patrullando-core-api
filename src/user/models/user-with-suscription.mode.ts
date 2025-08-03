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
  suscription_time_limit;

  @Expose()
  phone_number;


  // Exclude Keys
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

  @Exclude()
  role_history;

  @Exclude()
  suscription_detail;
}
