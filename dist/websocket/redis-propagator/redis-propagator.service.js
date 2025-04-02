"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisPropagatorService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const redis_service_1 = require("../redis/redis.service");
const socket_state_service_1 = require("../socket-state/socket-state.service");
const redis_propagator_constants_1 = require("./redis-propagator.constants");
const redis_propagator_dto_1 = require("./redis-propagator.dto");
let RedisPropagatorService = class RedisPropagatorService {
    constructor(socketStateService, redisService) {
        this.socketStateService = socketStateService;
        this.redisService = redisService;
        this.consumeEmitEvent = (eventInfo) => {
            const { event, data } = eventInfo;
            this.socketServer.emit(event, data);
        };
        this.consumeEmitEventRoom = (eventInfo) => {
            const { event, data, room, cduser } = eventInfo;
            common_1.Logger.log(`[consumeEmitEventRoom] ${room} ${event}`);
            const sockets = this.socketStateService.getByRoom(room);
            if (sockets === null || sockets === void 0 ? void 0 : sockets.length) {
                sockets.forEach(socket => {
                    socket.emit(event, data);
                });
            }
        };
        this.consumeEmitEventUser = (eventInfo) => {
            var _a;
            const { event, data, cduserTarget } = eventInfo;
            const sockets = (_a = this.socketStateService.getSocketsByCd(cduserTarget)) !== null && _a !== void 0 ? _a : [];
            sockets.forEach(socket => { socket.emit(event, data); });
        };
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT)
            .pipe((0, operators_1.tap)(this.consumeEmitEvent))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_ROOM)
            .pipe((0, operators_1.tap)(this.consumeEmitEventRoom))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_USER)
            .pipe((0, operators_1.tap)(this.consumeEmitEventUser))
            .subscribe();
    }
    injectSocketServer(server) {
        this.socketServer = server;
        return this;
    }
    propageteEvent(eventInfo) {
        let event = null;
        if (eventInfo instanceof redis_propagator_dto_1.RedisSocketEventUserDTO) {
            event = redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_USER;
        }
        else if (eventInfo instanceof redis_propagator_dto_1.RedisSocketEventRoomDTO) {
            event = redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_ROOM;
        }
        else if (eventInfo instanceof redis_propagator_dto_1.RedisSocketEventEmitDTO) {
            event = redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT;
        }
        common_1.Logger.log('[propagateEvent]', eventInfo.event);
        this.redisService.publish(event, eventInfo);
    }
};
RedisPropagatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_state_service_1.SocketStateService,
        redis_service_1.RedisService])
], RedisPropagatorService);
exports.RedisPropagatorService = RedisPropagatorService;
//# sourceMappingURL=redis-propagator.service.js.map