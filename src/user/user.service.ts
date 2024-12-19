import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findBy({username});
  }

  
  async create(createUserDto: CreateUserDto) {

    let passswordEncrypted = encryptText(createUserDto.password)
    
    let userObj      = new UserEntity()
    userObj.username = createUserDto.username
    userObj.email    = createUserDto.email
    userObj.password = passswordEncrypted

    const newUser = this.userRepository.create(userObj);
    return this.userRepository.save(newUser);
    //return 'This action adds a new usuario';
  }

  findAll() {
    /*const users = await dataSource
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne()*/

    const rawData = this.dataSource.query(`SELECT * FROM tb_usuarios`)

    return rawData;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

