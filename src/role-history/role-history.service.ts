import { Injectable } from '@nestjs/common';
import { CreateRoleHistoryDto } from './dto/create-role-history.dto';
import { UpdateRoleHistoryDto } from './dto/update-role-history.dto';

@Injectable()
export class RoleHistoryService {
  create(createRoleHistoryDto: CreateRoleHistoryDto) {
    return 'This action adds a new roleHistory';
  }

  findAll() {
    return `This action returns all roleHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleHistory`;
  }

  update(id: number, updateRoleHistoryDto: UpdateRoleHistoryDto) {
    return `This action updates a #${id} roleHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleHistory`;
  }
}
