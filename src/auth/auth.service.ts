import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptText } from 'src/utils/encrypt';
import { UserRoleService } from 'src/user-role/user-role.service';
import { LoginResponse } from './responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private jwtService: JwtService
  ) {}

  async LogIn(
    username: string,
    pass: string,
  ): Promise<LoginResponse> {

    let response = new LoginResponse()

    const user = await this.userService.findOne(username);
    
    if (user?.password !== encryptText(pass)) {

      response.status = false;
      response.message = "Usuario o Contraseña incorrecta."

      return response;
    }

    
    let userRole = await this.userRoleService.findRoleByUSer(user.id)
   
    const payload = { user_id: user.id, user_name: user.username, phone_number: user.phone_number, role_id : userRole.id , role_name : userRole.name};

    response.message = "¡Login Exitoso!"
    response.data = await this.jwtService.signAsync(payload)

    return response;

  }

  async getUserRole(userId){
    return await this.userRoleService.findRoleByUSer(userId)
  }
}
