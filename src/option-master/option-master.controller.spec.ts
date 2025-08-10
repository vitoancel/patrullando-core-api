import { Test, TestingModule } from '@nestjs/testing';
import { OptionMasterController } from './option-master.controller';
import { OptionMasterService } from './option-master.service';

describe('OptionMasterController', () => {
  let controller: OptionMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionMasterController],
      providers: [OptionMasterService],
    }).compile();

    controller = module.get<OptionMasterController>(OptionMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
