import { Controller, Get, Post, Body, Patch, Param, Delete,Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './responses/create-user.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    let userWasCreated = await this.userService.create(createUserDto);
    let response = new CreateUserResponse();

    if (!userWasCreated) {
      response.status = false;
      response.message = "Usuario o telefono ya existe."
      
      return response; 
    }

    response.message = "Usuario creado con éxito."
    
    return response;
  }
  
}
