import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/utils/enums/roles';
import { ListUsersWithSuscriptionDto } from './dto/list-users-with-suscription.dto';
import { UserWithSuscriptionModel } from './models/user-with-suscription.mode';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }

  async findOneWithRole(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['role'],
    });
  }

  async findAllWithSuscription(
    listUsersWithSuscription: ListUsersWithSuscriptionDto,
  ): Promise<UserWithSuscriptionModel[]> {
    const {
      page = 1,
      limit = 10,
      sort = null,
      filters = null,
    } = listUsersWithSuscription;

    // Construir opciones de búsqueda
    const options: FindManyOptions<UserEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: sort ? sort : undefined,
      where: filters ? filters : undefined,
      relations: ['role', 'role_history', 'role_history.plan'],
    };

    const data = await this.userRepository.find(options);

    return plainToInstance(UserWithSuscriptionModel, data);
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const alreadyExist = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { phone_number: createUserDto.phone_number },
      ],
    });
    if (alreadyExist) {
      return false;
    }

    try {
      // Creating a new user
      const passswordEncrypted = encryptText(createUserDto.password);

      const userObj = new UserEntity();
      userObj.username = createUserDto.username;
      userObj.phone_number = createUserDto.phone_number;
      userObj.password = passswordEncrypted;
      userObj.role_id = ROLES.FREE;

      const newUser = this.userRepository.create(userObj);
      await this.userRepository.save(newUser);

      return true;
    } catch (error) {
      console.log({ error: error.message });
      return false;
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }
}
