import { BaseResponse } from '../../utils/response';
import { UserWithSuscriptionModel } from '../models/user-with-suscription.mode';

export class ListUsersWithSuscriptionResponse extends BaseResponse<
  UserWithSuscriptionModel[]
> {}
