import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/create-user.request';
import { CreateUserResponse } from './responses/create-user.response';
import { ListUsersWithSuscriptionResponse } from './responses/list-users-with-suscription.response';
import { ListUsersWithSuscriptionRequest } from './requests/list-users-with-suscription.request';
import { UpdateUserRequest } from './requests/update-user.request';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserResponse } from './responses/update-user.response';
import { Response } from 'express';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'CREATE',
    description: 'Create a new user in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully created',
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - User or phone already exists',
    type: CreateUserResponse,
  })
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

  @ApiOperation({
    summary: 'LIST',
    description: 'Retrieve a list of users with their subscription information',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: ListUsersWithSuscriptionResponse,
  })
  @Post('List')
  async findAllWithSuscription(
    @Body() listUsersWithSuscription: ListUsersWithSuscriptionRequest,
  ): Promise<ListUsersWithSuscriptionResponse> {
    const response = new ListUsersWithSuscriptionResponse();
    const { total_records, dataMapped } =
      await this.userService.findAllWithSuscription(listUsersWithSuscription);
    response.total_records = total_records;
    response.data = dataMapped;
    return response;
  }

  @ApiOperation({
    summary: 'UPDATE',
    description: 'User Update',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing any parameter',
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UpdateUserResponse,
  })
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
    @Res() res: Response,
  ) {
    const response = new UpdateUserResponse();

    const serviceResponse = await this.userService.update(
      +id,
      updateUserRequest,
    );

    response.message = serviceResponse.data;
    response.status = serviceResponse.success;
    if (!serviceResponse.success) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
