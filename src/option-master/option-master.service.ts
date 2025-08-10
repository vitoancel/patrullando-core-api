import { Injectable } from '@nestjs/common';
import { CreateOptionMasterDto } from './dto/create-option-master.dto';
import { UpdateOptionMasterDto } from './dto/update-option-master.dto';

@Injectable()
export class OptionMasterService {
  create(createOptionMasterDto: CreateOptionMasterDto) {
    return 'This action adds a new optionMaster';
  }

  findAll() {
    return `This action returns all optionMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionMaster`;
  }

  update(id: number, updateOptionMasterDto: UpdateOptionMasterDto) {
    return `This action updates a #${id} optionMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionMaster`;
  }
}
