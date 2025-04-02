import { Logger} from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {AuthenticatedSocket} from './socket-state/socket-state.adapter';
import {SocketStateService} from './socket-state/socket-state.service';
import { Server } from 'socket.io';

@WebSocketGateway({ path: '/api/socketio', transports: ['websocket', 'polling'] })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server

  constructor(
    // @Inject(forwardRef(() => RedisPropagatorService))
    // private redisPropagatorService: RedisPropagatorService,
    private socketStateService: SocketStateService,
  ) {  }

  @SubscribeMessage('JoinRoom')
  joinRoom (@MessageBody() room: string, @ConnectedSocket() socket: AuthenticatedSocket) {
    Logger.log(`[WebsocketGateway/joinRoom] ${room} ${socket.auth.idlogin}`)
    this.socketStateService.joinRoom(socket, room)
  }

  notifyUser (event: string, data: any, cduser: number) {
    const sockets = this.socketStateService.getSocketsByCd(cduser) ?? []
    sockets.forEach(socket => { socket.emit(event, data) }) 
    // const eventInfo = new RedisSocketEventUserDTO(cduser, event, data)
    // this.redisPropagatorService.propageteEvent(eventInfo)
  }

  notifyAll (event: string, data: any) {
    this.server.emit(event, data)
    // const eventInfo = new RedisSocketEventEmitDTO(event, data)
    // this.redisPropagatorService.propageteEvent(eventInfo)
  }

  notifyRoom (room: string, event: string, data: any, cduser?: number) {
    event = `${room}/${event}`
    const sockets = this.socketStateService.getByRoom(room)
    if (sockets?.length) {
      sockets.forEach(socket => socket.emit(event, data))
    }
    // const eventInfo = new RedisSocketEventRoomDTO(room, event, data, cduser)
    // this.redisPropagatorService.propageteEvent(eventInfo)
  }
}
