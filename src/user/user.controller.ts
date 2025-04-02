import { Controller, Post, Get, Request, UsePipes, UseGuards, Body, Param, UseFilters, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserCreateDTO, UserLoginDTO, UserUpdateDTO, GrupoAcessoAddDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport'; import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TableSearchDTO, TableCreateDTO} from 'src/table/table.dto';
import { TableService} from 'src/table/table.service';
import { AdminGuard } from 'src/shared/admin.guard';
import {Roles} from 'src/shared/roles.decorator';
import {RolesGuard} from 'src/shared/roles.guard';
import {DBExceptionFilter} from 'src/shared/db.filter';

@UseFilters(DBExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor( private userService: UserService, private tableService: TableService,) {} // @UseGuards(JwtAuthGuard, AdminGuard)
  
  @Roles('bypass')
  @Get('all')
  all (@Request() req) {
    return this.userService.all();
  }

  @Roles('admin')
  @Post('grupo-acesso/add')
  async addGrupoAcesso (@Body() data: GrupoAcessoAddDTO) {
    await this.userService.addGrupoAcesso(data)
    return
  }

  @Roles('admin')
  @Get('grupo-acesso/all')
  async allGrupoAcesso (@Request() req) {
    return await this.userService.allGrupoAcesso()
  }

  @Roles('bypass')
  @Get('table/:nmtable')
  getTable (@Request() req, @Param('nmtable') nmtable) {
    return this.tableService.getTable(nmtable, req.user);
  }

  @Roles('bypass')
  @Post('table/:nmtable')
  setTable (@Request() req, @Body() data: TableCreateDTO, @Param('nmtable') nmtable) {
    return this.tableService.setTable(nmtable, data, req.user);
  }
  
  @Roles('admin')
  @Post('create')
  register (@Body() data: UserCreateDTO) {
    return this.userService.register(data);
  }


  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('update')
  update (@Body() data: UserUpdateDTO) {
    this.userService.update(data)
  }
}
