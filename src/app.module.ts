import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { Module, MiddlewareConsumer, NestModule, NestMiddleware, Logger, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogginInterceptor } from './shared/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { ChaveModule } from './chave/chave.module';
import { ConfigModule } from '@nestjs/config'
import { AtendimentoModule } from './atendimento/atendimento.module';
import { MonitorModule } from './monitor/monitor.module';
import { TableModule } from './table/table.module';
import { TicketModule } from './ticket/ticket.module';
import { AgendaModule } from './agenda/agenda.module';
import * as fs from 'fs'
import {CadastroSubscriber} from './shared/cadastro.subscriber';
import { FilesModule } from './files/files.module';
import { FilaEsperaModule } from './fila-espera/fila-espera.module';
import { WebsocketModule } from './websocket/websocket.module';
import {VersionControlMiddleware} from './shared/version-control.middleware';
import {VersionControlInterceptor} from './shared/version-control.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [
        __dirname + '/dist/../**/**.entity{.ts,.js}'
      ],
      synchronize: true,
      // ssl: process.env.PROD ? { ca: fs.readFileSync(__dirname + '/ca-certificate.crt'), rejectUnauthorized: false } : false,
      ssl: false,
      logging: ['error'],
      // extra: {
      //   ssl: process.env.PROD ? true : false,
      // },
      extra: {
        ssl: false,
      },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/api/static-images',
      rootPath: process.env.PROD ? join(__dirname, 'anexos', 'images') : join(__dirname, '..', 'anexos', 'images'),
    }),
    AuthModule,
    ChaveModule,
    AtendimentoModule,
    MonitorModule,
    TableModule,
    TicketModule,
    AgendaModule,
    FilesModule,
    FilaEsperaModule,
    WebsocketModule,
    // RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
    /*
    {
      provide: APP_INTERCEPTOR,
      useClass: VersionControlInterceptor,
    },
    */
    CadastroSubscriber,
    // SocketioGateway,
  ],
  // exports: [SocketioGateway],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VersionControlMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
