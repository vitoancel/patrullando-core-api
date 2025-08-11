import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ShowConfigResponse } from './response/show-config.response';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get(':code')
  async findOne(@Param('code') code: string) {
    const response = new ShowConfigResponse();

    const configEntity = await this.configService.findOne(code);

    if (!configEntity) {
      response.status = false;
      response.message = 'Config not found';
      response.data = null;
      return response;
    }

    response.data = configEntity;
    response.message = 'Config found successfully';
    return response;
  }
}
