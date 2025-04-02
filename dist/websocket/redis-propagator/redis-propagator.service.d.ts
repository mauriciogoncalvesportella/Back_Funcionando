import { Server } from 'socket.io';
import { RedisService } from '../redis/redis.service';
import { SocketStateService } from '../socket-state/socket-state.service';
import { RedisSocketEventEmitDTO, RedisSocketEventRoomDTO, RedisSocketEventUserDTO } from './redis-propagator.dto';
export declare class RedisPropagatorService {
    private readonly socketStateService;
    private readonly redisService;
    private socketServer;
    constructor(socketStateService: SocketStateService, redisService: RedisService);
    injectSocketServer(server: Server): RedisPropagatorService;
    private consumeEmitEvent;
    private consumeEmitEventRoom;
    private consumeEmitEventUser;
    propageteEvent(eventInfo: RedisSocketEventUserDTO | RedisSocketEventRoomDTO | RedisSocketEventEmitDTO): void;
}
