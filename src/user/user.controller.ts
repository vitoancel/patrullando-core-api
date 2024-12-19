import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);;
  }

  @Get(':nombre_usuario')
  findOne(@Param('nombre_usuario') nombre_usuario: string) {
    return this.userService.findOne(nombre_usuario);
  }

  @Get()
  findAll(@Param('nombre_usuario') nombre_usuario: string) {
    return this.userService.findAll();
  }
  
}
