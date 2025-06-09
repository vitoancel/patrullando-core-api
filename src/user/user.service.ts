import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/utils/enums/roles';

@Injectable()
export class UserService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({username:username});
  }

  async findOneWithRole(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['role']
    });
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
      userObj.role_id       = ROLES.FREE

      let newUser           = this.userRepository.create(userObj);
      let userDb            = await this.userRepository.save(newUser);

      return true;

    } catch (error) {

      return false;

    }
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}

