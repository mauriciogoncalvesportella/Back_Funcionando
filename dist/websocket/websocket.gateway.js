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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_state_service_1 = require("./socket-state/socket-state.service");
let WebsocketGateway = class WebsocketGateway {
    constructor(socketStateService) {
        this.socketStateService = socketStateService;
    }
    joinRoom(room, socket) {
        common_1.Logger.log(`[WebsocketGateway/joinRoom] ${room} ${socket.auth.idlogin}`);
        this.socketStateService.joinRoom(socket, room);
    }
    notifyUser(event, data, cduser) {
        var _a;
        const sockets = (_a = this.socketStateService.getSocketsByCd(cduser)) !== null && _a !== void 0 ? _a : [];
        sockets.forEach(socket => { socket.emit(event, data); });
    }
    notifyAll(event, data) {
        this.server.emit(event, data);
    }
    notifyRoom(room, event, data, cduser) {
        event = `${room}/${event}`;
        const sockets = this.socketStateService.getByRoom(room);
        if (sockets === null || sockets === void 0 ? void 0 : sockets.length) {
            sockets.forEach(socket => socket.emit(event, data));
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "joinRoom", null);
WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/api/socketio', transports: ['websocket', 'polling'] }),
    __metadata("design:paramtypes", [socket_state_service_1.SocketStateService])
], WebsocketGateway);
exports.WebsocketGateway = WebsocketGateway;
//# sourceMappingURL=websocket.gateway.js.map