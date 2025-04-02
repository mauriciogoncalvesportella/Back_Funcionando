import { Controller, UseFilters, Request, Post, Body, ParseArrayPipe, Get, Param, Logger, UseGuards, Query } from '@nestjs/common';
import {AgendaService} from './agenda.service';
import {DBExceptionFilter} from 'src/shared/db.filter';
import {EventoAddDTO, TipoAgendamentoAddDTO, TipoAgendamentoUpdateDTO, EventoUpdateDTO, EventoDuplicarDTO, EventoFixarDTO } from './agenda.dto';
import {TipoAgendamentoService} from './tpagendamento.service';
import {TipoAgendamentoEntity} from './tipoagendamento.entity';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {RolesGuard} from 'src/shared/roles.guard';
import {Roles} from 'src/shared/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('agenda')
@Controller('agenda')
export class AgendaController {
  constructor(
    private agendaService: AgendaService,
    private tipoAgendamentoService: TipoAgendamentoService,
  ) {}

  @UseFilters(DBExceptionFilter)
  @Post('evento/add')
  async eventoAdd (@Request() req, @Body() data: EventoAddDTO) {
    return await this.agendaService.addOrUpdateEvent(data, req.user, 'add')
  }

  @UseFilters(DBExceptionFilter)
  @Post('evento/update')
  async eventoUpdate (@Request() req, @Body() data: EventoUpdateDTO) {
    return await this.agendaService.addOrUpdateEvent(data, req.user, 'update')
  }

  @UseFilters(DBExceptionFilter)
  @Post('evento/fixar')
  async fixarEvento (@Request() req, @Body() data: EventoFixarDTO) {
    return await this.agendaService.fixarEvento(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('evento/duplicar/')
  async eventoDuplicar (@Request() req, @Body() data: EventoDuplicarDTO) {
    return await this.agendaService.duplicarEvento(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('evento/delete/:cd')
  async eventoDelete (@Request() req, @Param('cd') cd: number) {
    return await this.agendaService.deleteEvento(cd, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('evento/all/:dtinicio/:dtfim')
  async eventoAll (@Request() req, @Query('userTarget') userTarget: number, @Param('dtinicio') dtinicio: string, @Param('dtfim') dtfim: string) {
    return await this.agendaService.all(dtinicio, dtfim, req.user, userTarget)
  }

  @UseFilters(DBExceptionFilter)
  @Get('tipo-agendamento/all')
  async tipoAgendamentoAll () : Promise<TipoAgendamentoEntity[]> {
    return await this.tipoAgendamentoService.all()
  }

  @UseFilters(DBExceptionFilter)
  @Post('tipo-agendamento/add')
  async tipoAgendamentoAdd (@Body(new ParseArrayPipe({ items: TipoAgendamentoAddDTO })) data: TipoAgendamentoAddDTO[]) : Promise<void> {
    await this.tipoAgendamentoService.add(data)
  }

  @UseFilters(DBExceptionFilter)
  @Post('tipo-agendamento/update')
  async tipoAgendamentoUpdate (@Body(new ParseArrayPipe({ items: TipoAgendamentoUpdateDTO })) data: TipoAgendamentoUpdateDTO[]) : Promise<void> {
    await this.tipoAgendamentoService.update(data)
  }

  @UseFilters(DBExceptionFilter)
  @Post('tipo-agendamento/delete/:cd')
  async tipoAgendamentoDelete (@Param('cd') cd: number) : Promise<void> {
    await this.tipoAgendamentoService.delete(cd)
  }
}
