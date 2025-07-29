import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleHistoryService } from './role-history.service';
import { RoleHistoryController } from './role-history.controller';
import { RoleHistoryEntity } from './entities/role-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleHistoryEntity])],
  controllers: [RoleHistoryController],
  providers: [RoleHistoryService],
})
export class RoleHistoryModule {}
