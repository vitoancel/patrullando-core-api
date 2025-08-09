import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Hello endpoint',
    description: 'Returns a welcome message',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message returned successfully',
    type: String,
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
