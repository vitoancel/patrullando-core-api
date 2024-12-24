import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/user-role/entities/user-role.entity';
import { ROLES } from 'src/utils/enums/roles';

@Injectable()
export class UserService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({username:username});
  }

  
  async create(createUserDto: CreateUserDto): Promise<Boolean> {

    let alreadyExist = await this.userRepository.findOne({
                                                            where: [
                                                              { username: createUserDto.username },
                                                              { phone_number: createUserDto.phone_number },
                                                            ],
                                                          });
    if(alreadyExist){
      return false
    }

    try {
         
      // Creating a new user
      let passswordEncrypted = encryptText(createUserDto.password)

      let userObj           = new UserEntity()
      userObj.username      = createUserDto.username
      userObj.phone_number  = createUserDto.phone_number
      userObj.password      = passswordEncrypted

      let newUser           = this.userRepository.create(userObj);
      let userDb            = await this.userRepository.save(newUser);

      // Asign free role to new user
      let user_roleObj      = new UserRoleEntity()
      user_roleObj.role_id  = ROLES.FREE
      user_roleObj.user_id  = userDb.id

      let newUserRole       = this.userRoleRepository.create(user_roleObj);
      let userRoleDb        = await this.userRoleRepository.save(newUserRole);

      return true;

    } catch (error) {

      return false;

    }
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}

