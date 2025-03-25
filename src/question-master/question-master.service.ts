import { Injectable } from '@nestjs/common';
import { CreateQuestionMasterDto } from './dto/create-question-master.dto';
import { UpdateQuestionMasterDto } from './dto/update-question-master.dto';

@Injectable()
export class QuestionMasterService {
  create(createQuestionMasterDto: CreateQuestionMasterDto) {
    return 'This action adds a new questionMaster';
  }

  findAll() {
    return `This action returns all questionMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionMaster`;
  }

  update(id: number, updateQuestionMasterDto: UpdateQuestionMasterDto) {
    return `This action updates a #${id} questionMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionMaster`;
  }
}
