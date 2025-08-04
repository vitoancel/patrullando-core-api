import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './requests/create-user.request';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { encryptText } from 'src/utils/encrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/utils/enums/roles';
import { ListUsersWithSuscriptionRequest } from './requests/list-users-with-suscription.request';
import { UserWithSuscriptionModel } from './models/user-with-suscription.mode';
import { plainToInstance } from 'class-transformer';
import { ListUsersWithSuscriptionPaginationDto } from './dto/list-user.dto';
import { UpdateUserRequest } from './requests/update-user.request';
import { RoleHistoryService } from '../role-history/role-history.service';
import { CreateRoleHistoryDto } from '../role-history/dto/create-role-history.dto';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleHistoryService: RoleHistoryService,
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
    listUsersWithSuscription: ListUsersWithSuscriptionRequest,
  ): Promise<ListUsersWithSuscriptionPaginationDto> {
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
    const total_records: number = await this.userRepository.count(options);

    const dataMapped = plainToInstance(UserWithSuscriptionModel, data);

    return { total_records, dataMapped };
  }

  async create(createUserDto: CreateUserRequest): Promise<boolean> {
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

  async update(
    id: number,
    updateUserRequest: UpdateUserRequest,
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log({ id, updateUserRequest });
      // Find the user by ID
      const user = await this.userRepository.findOneBy({ id });

      // If user doesn't exist, return error
      if (!user) {
        return {
          success: false,
          message: `Usuario con ID ${id} no encontrado`,
        };
      }

      // Update only the fields that are provided in the request
      if (updateUserRequest.username !== undefined) {
        // Check if username already exists
        const existingUser = await this.userRepository.findOneBy({
          username: updateUserRequest.username,
        });

        if (existingUser && existingUser.id !== id) {
          return {
            success: false,
            message: 'El nombre de usuario ya está en uso',
          };
        }

        user.username = updateUserRequest.username;
      }

      if (updateUserRequest.password !== undefined) {
        // Encrypt the password before saving
        user.password = encryptText(updateUserRequest.password);
      }

      if (updateUserRequest.phone_number !== undefined) {
        // Check if phone number already exists
        const existingUser = await this.userRepository.findOneBy({
          phone_number: updateUserRequest.phone_number,
        });

        if (existingUser && existingUser.id !== id) {
          return {
            success: false,
            message: 'El número de teléfono ya está en uso',
          };
        }

        user.phone_number = updateUserRequest.phone_number;
      }

      if (updateUserRequest.status !== undefined) {
        user.status = updateUserRequest.status;
      }

      if (updateUserRequest.role_id !== undefined) {
        user.role_id = updateUserRequest.role_id;
      }

      // Check if plan_id and suscription_until are provided
      if (
        updateUserRequest.plan_id !== undefined &&
        updateUserRequest.suscription_until !== undefined
      ) {
        // Create a new role history record
        const createRoleHistoryDto: CreateRoleHistoryDto = {
          user_id: id,
          role_id: user.role_id,
          start_date: new Date(),
          end_date: updateUserRequest.suscription_until,
          plan_id: updateUserRequest.plan_id,
        };

        // Call the RoleHistoryService to handle the role history creation and status update
        await this.roleHistoryService.createWithStatusUpdate(
          createRoleHistoryDto,
        );
      }

      // Update the user in the database
      await this.userRepository.save(user);

      return {
        success: true,
        message: `Usuario con ID ${id} actualizado correctamente`,
      };
    } catch (error) {
      console.log({ error: error.message });
      return {
        success: false,
        message: `Error al actualizar el usuario: ${error.message}`,
      };
    }
  }
}
