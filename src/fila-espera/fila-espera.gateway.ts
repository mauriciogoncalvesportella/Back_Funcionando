import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets'
import {Server, Socket} from 'socket.io';
import {Logger, Inject, UseGuards} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthService} from 'src/auth/auth.service';
import {WsGuard} from 'src/shared/ws.guard';
var cookieParser = require('cookie-parser')

class Client {
  constructor(
    public socket: Socket,
    public user: any
  ) {  }
}

export class FilaEsperaGateway {
}
/*
@WebSocketGateway({ path: '/api/filaespera', transports: ['websocket', 'polling'] })
export class FilaEsperaGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
  ) {}

  @WebSocketServer()
  private server: Server;
  private clients: Array<Client> = []

  handleConnection(socket: Socket) {
    const cookies: string = socket.handshake.headers.cookie
    const token = cookies?.split('; ')?.find((cookie: string) => cookie.startsWith('Authentication'))?.split('=')[1];

    if (this.authService.validateToken(token)) {
      const user = this.authService.decode(token)
      this.clients.push(new Client(socket, user))
      Logger.error('Nova Conexão')
      return
    }
    Logger.error('Desconectado')
    socket.disconnect(true)
  }

  handleDisconnect(client: Socket) {
    const index = this.clients.findIndex(item => item.socket.id === client.id)
    if (index !== -1) {
      this.clients.splice(index, 1)
    }
    Logger.error('Desconectado', client.id)
  }

  notify (event: string, data: any, user: any) {
    for (const client of this.clients) {
      if (client.user.cd != user.cd) {
        client.socket.emit(event, data)
      }
    }
  }
}
*/
