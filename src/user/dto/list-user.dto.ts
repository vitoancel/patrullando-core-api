import { UserWithSuscriptionModel } from '../models/user-with-suscription.mode';
import { BasePaginationDto } from '../../utils/pagination.dto';

export class ListUsersWithSuscriptionPaginationDto extends BasePaginationDto<
  UserWithSuscriptionModel[]
> {}
