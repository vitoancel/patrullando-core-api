import { PaginationResponse } from '../../utils/response';
import { UserWithSuscriptionModel } from '../models/user-with-suscription.mode';
import { ApiProperty } from '@nestjs/swagger';

export class ListUsersWithSuscriptionResponse extends PaginationResponse<
  UserWithSuscriptionModel[]
> {
  @ApiProperty({
    description: 'List of users with subscription information',
    type: [UserWithSuscriptionModel],
    isArray: true,
  })
  override data?: UserWithSuscriptionModel[];
}
