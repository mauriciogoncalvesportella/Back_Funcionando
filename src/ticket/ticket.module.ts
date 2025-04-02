import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import {TicketEntity} from './ticket.entity';
import {UrgenciaEntity} from './urgencia.entity';
import { AcaoEntity } from './acao.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {SituacaoEntity} from './situacao.entity';
import { SolicitanteEntity } from 'src/chave/solicitante.entity';
import {MulterModule} from '@nestjs/platform-express';
import * as multer from 'multer';
import {UserEntity} from 'src/user/user.entity';
import {AtendimentoModule} from 'src/atendimento/atendimento.module';
import {TicketSubscriber} from './ticket.subscriber';
import {MotivoEntity} from 'src/atendimento/motivo.entity';
import {AcaoService} from './acao.service';
import {AcaoSubscriber} from './acao.subscriber';
import {ServicoEntity} from './servico.entity';
import {ServicoSubscriber} from './servico.subscriber';
import {ServicoService} from './servico.service';
import {SituacaoService} from './situacao.service';
import {UrgenciaService} from './urgencia.service';
import {ChaveEntity} from 'src/chave/chave.entity';
import {OrigemEntity} from 'src/atendimento/origem.entity';
import {MonitorModule} from 'src/monitor/monitor.module';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');


const fs = require('fs')

@Module({
  imports: [
    // RedisCacheModule,
    AtendimentoModule,
    MonitorModule,
    TypeOrmModule.forFeature([
      AtendimentoEntity,
      UrgenciaEntity,
      TicketEntity,
      SituacaoEntity,
      SolicitanteEntity,
      MotivoEntity,
      UserEntity,
      AcaoEntity,
      ServicoEntity,
      ChaveEntity,
      OrigemEntity,
    ]),
    // https://github.com/nestjs/nest/issues/2136
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          const path = (req.params.ticketcd && req.params.acaocd)
              ? `./anexos/${req.params.ticketcd}/${req.params.acaocd}`
              : './anexos/images'
          fs.mkdirSync(path, { recursive: true })
          return callback(null, path)
        },
        filename: function (req, file, callback) {          
          return callback(null, 
            (req.params.ticketcd && req.params.acaocd)
              ? file.originalname 
              : `${uuidv4()}${path.extname(file.originalname)}`)
        }
      }),
    }),
  ],
  providers: [TicketService, UrgenciaService, AcaoService, SituacaoService, ServicoService, TicketSubscriber, AcaoSubscriber, ServicoSubscriber],
  controllers: [TicketController],//, TicketFileController],
  exports: [SituacaoService, UrgenciaService, TicketService],
})
export class TicketModule {}
