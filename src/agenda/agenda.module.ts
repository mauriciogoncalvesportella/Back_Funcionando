import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoEntity} from './evento.entity';
import {AgendaService} from './agenda.service';
import {AgendaController} from './agenda.controller';
import {TipoAgendamentoEntity} from './tipoagendamento.entity';
import {TipoAgendamentoService} from './tpagendamento.service';
import {EventoSubscriber} from './evento.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventoEntity, TipoAgendamentoEntity]),
  ],
  providers: [AgendaService, TipoAgendamentoService, EventoSubscriber],
  controllers: [AgendaController],
  exports: [TipoAgendamentoService],
})
export class AgendaModule { }
