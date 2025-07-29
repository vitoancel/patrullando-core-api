import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleHistoryService } from './role-history.service';
import { CreateRoleHistoryDto } from './dto/create-role-history.dto';
import { UpdateRoleHistoryDto } from './dto/update-role-history.dto';

@Controller('role-history')
export class RoleHistoryController {
  constructor(private readonly roleHistoryService: RoleHistoryService) {}

  @Post()
  create(@Body() createRoleHistoryDto: CreateRoleHistoryDto) {
    return this.roleHistoryService.create();
  }

  @Get()
  findAll() {
    return this.roleHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleHistoryDto: UpdateRoleHistoryDto,
  ) {
    return this.roleHistoryService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleHistoryService.remove(+id);
  }
}
