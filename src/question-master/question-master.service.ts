import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionMasterService {
  create() {
    return 'This action adds a new questionMaster';
  }

  findAll() {
    return `This action returns all questionMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionMaster`;
  }

  update(id: number) {
    return `This action updates a #${id} questionMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionMaster`;
  }
}
