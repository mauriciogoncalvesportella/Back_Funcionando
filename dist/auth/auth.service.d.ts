import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './Auth.interfaces';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(idlogin: string, idsenha: string): Promise<any>;
    login(user: any): Promise<any>;
    logout(user: AuthUser): Promise<void>;
    validateToken(token: string): boolean;
    decode(token: string): any;
}
