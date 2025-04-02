import { Controller, Get, UseGuards, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {JwtAuthGuard} from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('time')
  getTime() {
    return new Date().getTime();
  }

  @Get('image/:name')
  getStaticImage (@Res() res, @Param() params) {
    // res.sendFile('')
    // return this.appService.getStaticImage(params.name);
  }
}
