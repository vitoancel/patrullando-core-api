import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { LoginResponse } from './responses/login.response';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    let response = new LoginResponse();

    if (!signInDto.username || !signInDto.password) {
      response.status = false;
      response.message = 'Usuario o Contraseña incorrecta.';
      response.data = null;
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    response = await this.authService.LogIn(
      signInDto.username,
      signInDto.password,
    );

    if (!response.status) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
