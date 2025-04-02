import { Controller, Post, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res) {
    const token = await this.authService.login(req.user)
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.EXPIRATION_TIME}; ${!process.env.PROD ? 'SameSite=None; Secure' : ''}`
    res.setHeader('Set-Cookie', cookie);
    return res.send({ token });
  }

  // @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    await this.authService.logout(req.user)
    res.clearCookie('Authentication')
    res.send()
  }
}
