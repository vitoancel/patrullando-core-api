import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity]) ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService]
})
export class UserRoleModule {}
