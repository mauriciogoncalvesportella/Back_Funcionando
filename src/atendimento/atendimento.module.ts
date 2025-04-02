import { Module, forwardRef } from '@nestjs/common';
import { AtendimentoController } from './atendimento.controller';
import { AtendimentoService } from './atendimento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoEntity } from './atendimento.entity';
import { ChaveEntity } from 'src/chave/chave.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { OrigemEntity } from './origem.entity';
import { OrigemService } from './origem.service';
import {MotivoEntity} from './motivo.entity';
import {MotivoService} from './motivo.service';
import {FilaEsperaEntity} from 'src/fila-espera/fila-espera.entity';
import {FilaEsperaModule} from 'src/fila-espera/fila-espera.module';
import {MonitorModule} from 'src/monitor/monitor.module';
import {AtendimentoSubscriber} from './atendimento.subscriber';

@Module({
  imports: [
    MonitorModule,
    FilaEsperaModule,
    TypeOrmModule.forFeature([
      FilaEsperaEntity,
      AtendimentoEntity,
      OrigemEntity,
      ChaveEntity,
      TicketEntity,
      MotivoEntity,
    ]),
  ],
  controllers: [ AtendimentoController ],
  providers: [ AtendimentoService, OrigemService, MotivoService, AtendimentoSubscriber ],
  exports: [AtendimentoService, OrigemService, MotivoService],
})
export class AtendimentoModule {}
