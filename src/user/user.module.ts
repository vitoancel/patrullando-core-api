import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRoleEntity } from 'src/user-role/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([UserRoleEntity]) ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
  