import { BaseResponse } from '../../utils/response';
import { UserWithSuscriptionModel } from '../models/user-with-suscription.mode';
import { Expose, Type } from 'class-transformer';

export class ListUsersWithSuscriptionResponse extends BaseResponse<
  UserWithSuscriptionModel[]
> {}
