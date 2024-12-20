import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  
  async create(createUserDto: CreateUserDto): Promise<Boolean> {

    let alreadyExist = await this.userRepository.findOneBy({username:createUserDto.username, email: createUserDto.email});

    if(alreadyExist){
      return false
    }

    try {
      let passswordEncrypted = encryptText(createUserDto.password)
    
      let userObj      = new UserEntity()
      userObj.username = createUserDto.username
      userObj.email    = createUserDto.email
      userObj.password = passswordEncrypted

      const newUser = this.userRepository.create(userObj);
      await this.userRepository.save(newUser);

      return true;

    } catch (error) {

      return false;

    }
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}

