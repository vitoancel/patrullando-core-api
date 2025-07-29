import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleHistoryService {
  create() {
    return 'This action adds a new roleHistory';
  }

  findAll() {
    return `This action returns all roleHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleHistory`;
  }

  update(id: number) {
    return `This action updates a #${id} roleHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleHistory`;
  }
}
