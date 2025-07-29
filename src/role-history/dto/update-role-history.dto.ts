import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleHistoryDto } from './create-role-history.dto';

export class UpdateRoleHistoryDto extends PartialType(CreateRoleHistoryDto) {}
