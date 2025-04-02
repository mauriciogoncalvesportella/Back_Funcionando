import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<any>;
    logout(req: any, res: Response): Promise<void>;
}
