import {INestApplicationContext, Logger, WebSocketAdapter} from '@nestjs/common';
import {IoAdapter} from '@nestjs/platform-socket.io';
import { Socket, Server, ServerOptions } from 'socket.io'
import {AuthUser} from 'src/auth/Auth.interfaces';
import {AuthService} from 'src/auth/auth.service';
import {SocketStateService} from './socket-state.service';

export interface AuthenticatedSocket extends Socket {
  auth: AuthUser,
}

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
  public constructor(
    private readonly app: INestApplicationContext,
    private readonly socketStateService: SocketStateService,
    private readonly authService: AuthService
  ) {
    super(app)
  }

  private server: Server; 

  public create (port: number, options: ServerOptions = {}): Server {
    this.server = super.createIOServer(port, options)
    this.server.use(async (socket: AuthenticatedSocket, next) => {
      const cookies: string = socket.handshake.headers.cookie
      const token = cookies?.split('; ')?.find((cookie: string) => cookie.startsWith('Authentication'))?.split('=')[1];
      try {
        if (token && this.authService.validateToken(token)) {
          socket.auth = this.authService.decode(token)
          return next()
        }
        throw new Error('Invalid credentials')
      } catch (err) {
        Logger.error(err)
        socket.disconnect(true)
      }
    })
    return this.server
  }

  public bindClientConnect(server: Server, callback: Function): void {
    this.server.on('connection', (socket: AuthenticatedSocket) => {
      this.socketStateService.add(socket)
      socket.on('disconnect', () => {
        this.socketStateService.remove(socket)
      })
      callback(socket)
    })
  }
}
