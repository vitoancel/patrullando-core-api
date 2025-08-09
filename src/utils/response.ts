import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({
    description: 'Response message',
    example: 'Operation successful',
  })
  message: string = '';

  @ApiProperty({ description: 'Response status', example: true })
  status: boolean = true;

  @ApiProperty({ description: 'HTTP status code', example: 200 })
  code: number = 200;

  @ApiProperty({ description: 'Response data', required: false })
  data?: T; // Generic property for data
}

export class PaginationResponse<T> extends BaseResponse<T> {
  @ApiProperty({ description: 'Total number of records', example: 0 })
  total_records: number = 0;
}
