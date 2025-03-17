import { Test, TestingModule } from '@nestjs/testing';
import { ExamMasterController } from './exam-master.controller';
import { ExamMasterService } from './exam-master.service';

describe('ExamMasterController', () => {
  let controller: ExamMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamMasterController],
      providers: [ExamMasterService],
    }).compile();

    controller = module.get<ExamMasterController>(ExamMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
