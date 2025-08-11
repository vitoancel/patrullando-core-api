import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OptionMasterService } from './option-master.service';
import { CreateOptionMasterDto } from './dto/create-option-master.dto';
import { UpdateOptionMasterDto } from './dto/update-option-master.dto';

@Controller('option-master')
export class OptionMasterController {
  constructor(private readonly optionMasterService: OptionMasterService) {}

  @Post()
  create(@Body() createOptionMasterDto: CreateOptionMasterDto) {
    return this.optionMasterService.create(createOptionMasterDto);
  }

  @Get()
  findAll() {
    return this.optionMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionMasterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOptionMasterDto: UpdateOptionMasterDto,
  ) {
    return this.optionMasterService.update(+id, updateOptionMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionMasterService.remove(+id);
  }
}
