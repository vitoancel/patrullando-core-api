import { BaseResponse } from 'src/utils/response';
import { UserEntity } from '../entities/user.entity';

export class CreateUserResponse extends BaseResponse<UserEntity[]> {}
