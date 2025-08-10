import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseListRequest<T> {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10,
    minimum: 1,
    type: Number,
  })
  limit: number = 10;

  @ApiPropertyOptional({
    description:
      "Sorting object where keys are entity fields and values are 'asc' or 'desc'",
    example: { id: 'desc' },
    type: 'object',
    additionalProperties: { type: 'string', enum: ['asc', 'desc'] },
  })
  sort?: Partial<Record<keyof T, 'asc' | 'desc'>>;

  @ApiPropertyOptional({
    description:
      'Filters object where keys are entity fields and values are the desired filter values',
    example: { id: 1 },
    type: 'object',
    additionalProperties: { type: 'string', enum: ['asc', 'desc'] },
  })
  filters?: Partial<Record<keyof T, any>>;
}
