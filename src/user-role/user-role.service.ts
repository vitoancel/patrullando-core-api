import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {

  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return 'This action adds a new userRole';
  }

  findAll() {
    return `This action returns all userRole`;
  }

  async findRoleByUSer(user_id: number) {
    let userRole = await this.userRoleRepository.findOne({
      where: {user_id : user_id},
      relations: ['role']
    });


    
    console.log({role:userRole.role})

    return userRole.role;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
