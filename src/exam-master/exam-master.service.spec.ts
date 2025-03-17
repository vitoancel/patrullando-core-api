import { Test, TestingModule } from '@nestjs/testing';
import { ExamMasterService } from './exam-master.service';

describe('ExamMasterService', () => {
  let service: ExamMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamMasterService],
    }).compile();

    service = module.get<ExamMasterService>(ExamMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
