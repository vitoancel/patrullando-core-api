import { Test, TestingModule } from '@nestjs/testing';
import { OptionMasterService } from './option-master.service';

describe('OptionMasterService', () => {
  let service: OptionMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionMasterService],
    }).compile();

    service = module.get<OptionMasterService>(OptionMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
