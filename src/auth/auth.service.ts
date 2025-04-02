import { Injectable, Logger, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {SocketioGateway} from 'src/socketio.gateway';
import {AuthUser} from './Auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // private socketioGateway: SocketioGateway,
  ) {}

  async validateUser(idlogin: string, idsenha: string): Promise<any> {
    const user = await this.userService.findOne(idlogin);

    if(user && await user.comparePassword(idsenha)) {
      const { idsenha, ...result } = user;
      return result;
    }

    return undefined;
  }

  async login(user: any) {
    const roles = user.grupoacesso.jsroles
    const payload: AuthUser = {
      idlogin: user.idlogin,
      cd: user.cd,
      idcolor: user.idcolor,
      roles,
    }
    return this.jwtService.sign(payload)
  }

  async logout (user: AuthUser) {
    // this.socketioGateway.disconnect(user)
  }

  validateToken (token: string): boolean {
    try {
      if (!token || !this.jwtService.verify(token)) {
        return false
      }
      return true
    } catch (err) {
      return false
    }
  }

  decode (token: string): any {
    return this.jwtService.decode(token)
  }
}
