import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './responses/create-user.response';
import { ListUsersWithSuscriptionResponse } from './responses/list-users-with-suscription.response';
import { ListUsersWithSuscriptionDto } from './dto/list-users-with-suscription.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userWasCreated = await this.userService.create(createUserDto);
    const response = new CreateUserResponse();

    if (!userWasCreated) {
      response.status = false;
      response.message = 'Usuario o telefono ya existe.';

      return response;
    }

    response.message = 'Usuario creado con éxito.';

    return response;
  }

  @Get()
  async findAllWithSuscription(
    @Body() listUsersWithSuscription: ListUsersWithSuscriptionDto,
  ): Promise<ListUsersWithSuscriptionResponse> {
    const response = new ListUsersWithSuscriptionResponse();
    response.data = await this.userService.findAllWithSuscription(
      listUsersWithSuscription,
    );
    return response;
  }
}
