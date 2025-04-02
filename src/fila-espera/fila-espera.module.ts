import { Module, forwardRef } from '@nestjs/common';
import { FilaEsperaService } from './fila-espera.service';
import { FilaEsperaController } from './fila-espera.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilaEsperaEntity} from './fila-espera.entity';
import {SolicitanteEntity} from 'src/chave/solicitante.entity';
import {FilaEsperaGateway} from './fila-espera.gateway';
import {AuthModule} from 'src/auth/auth.module';
import {ChaveEntity} from 'src/chave/chave.entity';
import {AppModule} from 'src/app.module';

@Module({
  imports: [
    forwardRef(() => AppModule),
    TypeOrmModule.forFeature([
      FilaEsperaEntity,
      SolicitanteEntity,
      ChaveEntity,
    ]),
  ],
  providers: [FilaEsperaService, FilaEsperaGateway],
  controllers: [FilaEsperaController],
  exports: [FilaEsperaGateway, FilaEsperaService],
})
export class FilaEsperaModule {}
