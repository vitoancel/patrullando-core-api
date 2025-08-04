import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleHistoryService } from './role-history.service';
import { CreateRoleHistoryDto } from './dto/create-role-history.dto';
import { UpdateRoleHistoryDto } from './dto/update-role-history.dto';
import { RoleHistoryEntity } from './entities/role-history.entity';

@Controller('role-history')
export class RoleHistoryController {
  constructor(private readonly roleHistoryService: RoleHistoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createRoleHistoryDto: CreateRoleHistoryDto,
  ): Promise<RoleHistoryEntity> {
    return this.roleHistoryService.create(createRoleHistoryDto);
  }

  @Get()
  findAll(): Promise<RoleHistoryEntity[]> {
    return this.roleHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoleHistoryEntity> {
    return this.roleHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleHistoryDto: UpdateRoleHistoryDto,
  ): Promise<RoleHistoryEntity> {
    return this.roleHistoryService.update(+id, updateRoleHistoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.roleHistoryService.remove(+id);
  }
}
