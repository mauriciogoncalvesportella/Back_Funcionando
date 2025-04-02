import { Controller, UseGuards, Request, Get, Post, Body, ParseArrayPipe, UseFilters, Param, Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AtendimentoAddDTO, AtendimentoDoneDTO, AtendimentoAdminDTO, AtendimentoUpdateDTO, AtendimentoStopStartDTO, AtendimentoChangeMotivoDTO, OrigemAddDTO, OrigemUpdateDTO, MotivoAddDTO, MotivoUpdateDTO } from './atendimento.dto';
import { AtendimentoService } from './atendimento.service';
import { OrigemService } from './origem.service';
import {RolesGuard} from 'src/shared/roles.guard';
import {Roles} from 'src/shared/roles.decorator';
import {DBExceptionFilter} from 'src/shared/db.filter';
import {OrigemEntity} from './origem.entity';
import {MotivoEntity} from './motivo.entity';
import {MotivoService} from './motivo.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('atendimento')
export class AtendimentoController {
  constructor(
    private origemService: OrigemService,
    private atendimentoService: AtendimentoService,
    private motivoService: MotivoService,
  ) {}

  @Roles('atendimento')
  @Get('refresh')
  refreshState(@Request() req) {
    return req.user;
  }

  @UseFilters(DBExceptionFilter)
  @Roles('atendimento')
  @Post('add')
  add (@Request() req, @Body() data: AtendimentoAddDTO) {
    return this.atendimentoService.add(data, req.user);
  }

  @UseFilters(DBExceptionFilter)
  @Roles('atendimento')
  @Post('stop-start')
  stopStart (@Request() req, @Body() data: AtendimentoStopStartDTO) {
    return this.atendimentoService.stopStart(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('online')
  getOnline (@Request() req) {
    return this.atendimentoService.getOnline()
  }

  @Roles('atendimento')
  @Get('all')
  all (@Request() req) {
    return this.atendimentoService.all(req.user);
  }
  
  @Roles('atendimento')
  @Post('done')
  done (@Request() req, @Body() data: AtendimentoDoneDTO) {
    return this.atendimentoService.done(data, req.user)
  }
 
  @UseFilters(DBExceptionFilter)
  @Roles('atendimento')
  @Post('all-admin')
  allAdmin (@Request() req, @Body() data : AtendimentoAdminDTO) {
    return this.atendimentoService.allAdmin(data, req.user)
  }
 
  @Roles('atendimento.others.rewrite')
  @Post('update')
  update (@Request() req, @Body() data: AtendimentoUpdateDTO) {
    return this.atendimentoService.update(data)
  }

  @Roles('atendimento')
  @UseFilters(DBExceptionFilter)
  @Post('change-motivo')
  async changeMotivo (@Request() req, @Body() data: AtendimentoChangeMotivoDTO) {
    await this.atendimentoService.changeMotivo(data, req.user, null)
  }

  @Roles('atendimento.others.rewrite')
  @Get('destroy/:cd')
  destroy (@Param('cd') cd : number) {
    this.atendimentoService.destroy(cd)
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('origem/add')
  async origemAdd (@Body() data: OrigemAddDTO) {
    await this.origemService.add(data)
  }

  @Get('origem/all')
  async origemAll () : Promise<OrigemEntity[]> {
    return await this.origemService.all()
  }

  @Post('origem/update')
  async origemUpdate (@Body(new ParseArrayPipe({ items: OrigemUpdateDTO })) data: OrigemUpdateDTO[]) : Promise<void> {
    await this.origemService.update(data)
  }

  @Roles('cadastro')
  @Post('origem/delete/:cd')
  async origemDelete (@Param('cd') cd: number) {
    await this.origemService.delete(cd)
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('motivo/add')
  async motivoAdd (@Body(new ParseArrayPipe({ items: MotivoAddDTO })) data: MotivoAddDTO[]) : Promise<void> {
    await this.motivoService.add(data)
  }

  @Roles('cadastro')
  @Post('motivo/delete/:cd')
  async motivoDelete (@Param('cd') cd: number) : Promise<void>{
    await this.motivoService.delete(cd)
  }

  @UseFilters(DBExceptionFilter)
  @Post('motivo/update')
  async motivoUpdate (@Body(new ParseArrayPipe({ items: MotivoUpdateDTO })) data: MotivoUpdateDTO[]) : Promise<void> {
    await this.motivoService.update(data)
  }

  @UseFilters(DBExceptionFilter)
  @Get('motivo/all')
  async motivoAll () : Promise<MotivoEntity[]> {
    return await this.motivoService.all()
  }
}
