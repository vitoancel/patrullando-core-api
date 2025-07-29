import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/create-user.request';
import { CreateUserResponse } from './responses/create-user.response';
import { ListUsersWithSuscriptionResponse } from './responses/list-users-with-suscription.response';
import { ListUsersWithSuscriptionRequest } from './requests/list-users-with-suscription.request';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserRequest) {
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
    @Body() listUsersWithSuscription: ListUsersWithSuscriptionRequest,
  ): Promise<ListUsersWithSuscriptionResponse> {
    const response = new ListUsersWithSuscriptionResponse();
    response.data = await this.userService.findAllWithSuscription(
      listUsersWithSuscription,
    );
    return response;
  }
}
