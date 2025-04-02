import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import {UserEntity} from 'src/user/user.entity';
import * as moment from 'moment-timezone' 
import {AcaoEntity} from 'src/ticket/acao.entity';

@Module({
  imports: [
    // RedisCacheModule,
    TypeOrmModule.forFeature([
      UserEntity,
      AtendimentoEntity,
      AcaoEntity,
    ])
  ],
  providers: [
    MonitorService,
    {
      provide: 'MomentWrapper',
      useValue: moment, 
    }
  ],
  controllers: [MonitorController],
  exports: [MonitorService],
})
export class MonitorModule {}
