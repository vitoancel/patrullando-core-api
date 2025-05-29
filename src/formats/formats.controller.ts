import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { AllFormatsResponse } from './responses/all-formats.response';

@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Post()
  create(@Body() createFormatDto: CreateFormatDto) {
    return this.formatsService.create(createFormatDto);
  }

  @Get()
  async findAll() {
    let response = new AllFormatsResponse()
    
    response.data = await this.formatsService.findAll();

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormatDto: UpdateFormatDto) {
    return this.formatsService.update(+id, updateFormatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatsService.remove(+id);
  }
}
