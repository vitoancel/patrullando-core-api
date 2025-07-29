import { Test, TestingModule } from '@nestjs/testing';
import { RoleHistoryController } from './role-history.controller';
import { RoleHistoryService } from './role-history.service';

describe('RoleHistoryController', () => {
  let controller: RoleHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleHistoryController],
      providers: [RoleHistoryService],
    }).compile();

    controller = module.get<RoleHistoryController>(RoleHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
