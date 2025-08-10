import { PartialType } from '@nestjs/swagger';
import { CreateOptionMasterDto } from './create-option-master.dto';

export class UpdateOptionMasterDto extends PartialType(CreateOptionMasterDto) {}
