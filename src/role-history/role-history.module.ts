import { Module } from '@nestjs/common';
import { RoleHistoryService } from './role-history.service';
import { RoleHistoryController } from './role-history.controller';

@Module({
  controllers: [RoleHistoryController],
  providers: [RoleHistoryService],
})
export class RoleHistoryModule {}
