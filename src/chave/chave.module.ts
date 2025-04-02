import { Module } from '@nestjs/common';
import { ChaveService } from './chave.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaveEntity } from './chave.entity';
import { ChaveController } from './chave.controller';
import { SolicitanteEntity } from './solicitante.entity';
import {Xc3Service} from './xc3.service';
import {Xc3Controller} from './xc3.controller'
import {ChaveFoneEntity} from './chavefone.entity'
import {UserEntity} from '../user/user.entity'
import {AtendimentoModule} from 'src/atendimento/atendimento.module';

@Module({
  imports: [
    AtendimentoModule,
    TypeOrmModule.forFeature([ChaveEntity, SolicitanteEntity, ChaveFoneEntity, UserEntity])
  ],
  providers: [ChaveService, Xc3Service],
  controllers: [ChaveController, Xc3Controller],
})
export class ChaveModule {}
