import { BaseResponse } from 'src/utils/response';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse extends BaseResponse<string> {
  @ApiProperty({
    description: 'JWT token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: String,
  })
  override data?: string;
}
