import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import {tap} from 'rxjs/operators';
import {Server} from 'socket.io';
import {RedisService} from '../redis/redis.service';
import {SocketStateService} from '../socket-state/socket-state.service';
import {REDIS_SOCKET_EVENT_EMIT, REDIS_SOCKET_EVENT_EMIT_ROOM, REDIS_SOCKET_EVENT_EMIT_USER } from './redis-propagator.constants';
import {RedisSocketEventEmitDTO, RedisSocketEventRoomDTO, RedisSocketEventUserDTO} from './redis-propagator.dto';

@Injectable()
export class RedisPropagatorService {
  private socketServer: Server;

  public constructor(
    private readonly socketStateService: SocketStateService,
    private readonly redisService: RedisService,
  ) {
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT)
      .pipe(tap(this.consumeEmitEvent))
      .subscribe()

    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_ROOM)
      .pipe(tap(this.consumeEmitEventRoom))
      .subscribe()

    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_USER)
      .pipe(tap(this.consumeEmitEventUser))
      .subscribe()
  }

  public injectSocketServer (server: Server): RedisPropagatorService {
    this.socketServer = server
    return this
  }

  private consumeEmitEvent = (eventInfo: RedisSocketEventEmitDTO): void => {
    const { event, data } = eventInfo
    this.socketServer.emit(event, data)
  }

  private consumeEmitEventRoom = (eventInfo: RedisSocketEventRoomDTO): void => {
    const { event, data, room, cduser } = eventInfo
    Logger.log(`[consumeEmitEventRoom] ${room} ${event}`)
    const sockets = this.socketStateService.getByRoom(room)
    if (sockets?.length) {
      sockets.forEach(socket => {
        socket.emit(event, data)
      })
    }
  }

  private consumeEmitEventUser = (eventInfo: RedisSocketEventUserDTO): void => {
    const { event, data, cduserTarget } = eventInfo
    const sockets = this.socketStateService.getSocketsByCd(cduserTarget) ?? []
    sockets.forEach(socket => { socket.emit(event, data) }) 
  }

  public propageteEvent (
    eventInfo: RedisSocketEventUserDTO | RedisSocketEventRoomDTO | RedisSocketEventEmitDTO
  ): void {
    let event = null
    if (eventInfo instanceof RedisSocketEventUserDTO) {
      event = REDIS_SOCKET_EVENT_EMIT_USER
    } else if (eventInfo instanceof RedisSocketEventRoomDTO) {
      event = REDIS_SOCKET_EVENT_EMIT_ROOM
    } else if (eventInfo instanceof RedisSocketEventEmitDTO) {
      event = REDIS_SOCKET_EVENT_EMIT
    }
    Logger.log('[propagateEvent]', eventInfo.event)
    this.redisService.publish(event, eventInfo)
  }
}
