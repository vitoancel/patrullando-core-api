import { BaseResponse } from 'src/utils/response';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse extends BaseResponse<null> {
  @ApiProperty({
    description: 'Response message',
    example: 'Usuario creado con éxito.',
    type: String,
  })
  override message: string;

  @ApiProperty({
    description: 'Response status',
    example: true,
    type: Boolean,
  })
  override status: boolean;
}
