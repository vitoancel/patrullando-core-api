import { BaseListRequest } from '../../utils/request';
import { UserWithSuscriptionModel } from '../models/user-with-suscription.mode';

export class ListUsersWithSuscriptionDto extends BaseListRequest<UserWithSuscriptionModel> {}
