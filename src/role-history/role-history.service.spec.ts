import { Test, TestingModule } from '@nestjs/testing';
import { RoleHistoryService } from './role-history.service';

describe('RoleHistoryService', () => {
  let service: RoleHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleHistoryService],
    }).compile();

    service = module.get<RoleHistoryService>(RoleHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
