import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { AllFormatResponse } from './responses/all-format.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListFormatRequest } from './request/all-format.request';
import { ListUsersWithSuscriptionResponse } from '../user/responses/list-users-with-suscription.response';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @ApiOperation({
    summary: 'LIST',
    description: 'Retrieve a list formats',
  })
  @ApiResponse({
    status: 200,
    description: 'List of formats retrieved successfully',
    type: ListUsersWithSuscriptionResponse,
  })
  @Post('list')
  async findAll(@Body() request: ListFormatRequest) {
    const response = new AllFormatResponse();

    const { total_records, dataMapped } =
      await this.formatsService.findAll(request);

    response.data = dataMapped;
    response.total_records = total_records;

    return response;
  }
}
