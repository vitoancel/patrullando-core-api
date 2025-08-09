import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginResponse } from './responses/login.response';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginRequest } from './requests/auth-login.request';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'LOGIN',
    description: 'Authenticate a user with username and password',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing username or password',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: LoginResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthLoginRequest, @Res() res: Response) {
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

  @ApiOperation({
    summary: 'PROFILE',
    description: 'Retrieve the profile of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
