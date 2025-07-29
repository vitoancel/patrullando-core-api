import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptText } from 'src/utils/encrypt';
import { LoginResponse } from './responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async LogIn(username: string, pass: string): Promise<LoginResponse> {
    const response = new LoginResponse();

    const user = await this.userService.findOneWithRole(username);

    if (user?.password !== encryptText(pass)) {
      response.status = false;
      response.message = 'Usuario o Contraseña incorrecta.';

      return response;
    }

    const payload = {
      user_id: user.id,
      user_name: user.username,
      phone_number: user.phone_number,
      role_id: user.role.id,
      role_name: user.role.name,
    };

    response.message = '¡Login Exitoso!';
    response.data = await this.jwtService.signAsync(payload);

    return response;
  }

  async getUserRole(username) {
    return await this.userService.findOneWithRole(username);
  }
}
