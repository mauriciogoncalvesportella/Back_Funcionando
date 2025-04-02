import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
var cookieParser = require('cookie-parser')
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {SocketStateService} from './websocket/socket-state/socket-state.service';
import {AuthService} from './auth/auth.service';
import {SocketStateAdapter} from './websocket/socket-state/socket-state.adapter';

const initWebSocketAdapter = (app: INestApplication): INestApplication => {
  const socketStateService = app.get(SocketStateService)
  const authService = app.get(AuthService)
  app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, authService))
  return app
}

async function bootstrap() {
  console.log(process.env)
  const app = await NestFactory.create(AppModule);
  
  // Configuração CORS melhorada com o cabeçalho version-control
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'version-control',
      'x-csrf-token',
      'x-requested-with'
    ],
    exposedHeaders: ['Authorization']
  });
  
  initWebSocketAdapter(app)
  
  app.use(cookieParser())
  app.use(express.static('public'))
  app.use(bodyParser.json({ limit: '20mb' }))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  
  await app.listen(parseInt(process.env.PORT));
  console.log('servidor online')
}

bootstrap();