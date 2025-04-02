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
exports.SocketioGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const auth_service_1 = require("./auth/auth.service");
const common_1 = require("@nestjs/common");
class Client {
    constructor(socket, user, rooms = {}) {
        this.socket = socket;
        this.user = user;
        this.rooms = rooms;
    }
    joinedAtRoom(room) {
        return this.rooms.includes(room);
    }
}
class ClientList {
    constructor() {
        this.clients = [];
        this.clientsByRoom = {};
    }
    getFromID(id) {
        return this.clients.find(client => client.socket.id === id);
    }
    getFromCD(cd) {
        return this.clients.find(client => client.user.cd === cd);
    }
    getClient(identifier) {
        if (typeof (identifier) === 'string') {
            return this.getFromID(identifier);
        }
        else if (typeof (identifier) === 'number') {
            return this.getFromCD(identifier);
        }
    }
    getIndex(identifier) {
        switch (typeof (identifier)) {
            case 'string': return this.clients.findIndex(client => client.socket.id === identifier);
            case 'number': return this.clients.findIndex(client => client.user.cd === identifier);
            default: return null;
        }
    }
    add(client) {
        this.clients.push(client);
    }
    joinRoom(identifier, room) {
        var _a;
        const client = this.getClient(identifier);
        if (client) {
            client.rooms[room] = true;
            this.clientsByRoom[room] = (_a = this.clientsByRoom[room]) !== null && _a !== void 0 ? _a : [];
            this.clientsByRoom[room].push(client);
        }
    }
    notify(event, msg, user, room = null) {
        let clients = room ? this.clientsByRoom[room] : this.clients;
        for (const client of clients) {
            if (client.user.cd !== user.cd) {
                const ev = room ? `${room}/${event}` : event;
                client.socket.emit(ev, msg);
            }
        }
    }
    leaveRoom(identifier, room) {
        const client = this.getClient(identifier);
        delete client.rooms[room];
    }
    disconnect(identifier) {
        const client = this.getClient(identifier);
        const index = this.getIndex(identifier);
        if (index >= 0 && client) {
            this.clients.splice(index, 1);
            client.socket.disconnect();
        }
    }
}
let SocketioGateway = class SocketioGateway {
    constructor(authService) {
        this.authService = authService;
        this.clients = new ClientList();
    }
    handleConnection(client) {
        var _a, _b;
        const cookies = client.handshake.headers.cookie;
        const token = (_b = (_a = cookies === null || cookies === void 0 ? void 0 : cookies.split('; ')) === null || _a === void 0 ? void 0 : _a.find((cookie) => cookie.startsWith('Authentication'))) === null || _b === void 0 ? void 0 : _b.split('=')[1];
        if (token && this.authService.validateToken(token)) {
            const user = this.authService.decode(token);
            this.clients.add(new Client(client, user));
            common_1.Logger.log(`${user.idlogin} connected to the socket`);
            return;
        }
        client.disconnect(true);
    }
    handleDisconnect(client) {
        this.clients.disconnect(client.id);
        common_1.Logger.log(`${client.id} disconnected`);
    }
    disconnect(user) {
        this.clients.disconnect(user.cd);
        common_1.Logger.log(`${user.idlogin} forced to disconnect`);
    }
    notify(event, data, user, room = null) {
        common_1.Logger.log(`${event}, ${user.idlogin}`);
        this.clients.notify(event, data, user, room);
    }
    getClientSocket(identifier) {
        return this.clients.getClient(identifier);
    }
    handleEvent(client) {
        const { user } = this.clients.getClient(client.id);
        common_1.Logger.log(`${user === null || user === void 0 ? void 0 : user.idlogin} joined to FilaEspera room`);
        this.clients.joinRoom(client.id, 'FilaEspera');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], SocketioGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinFilaEspera'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocketioGateway.prototype, "handleEvent", null);
SocketioGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/api/socketio', transports: ['websocket', 'polling'] }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], SocketioGateway);
exports.SocketioGateway = SocketioGateway;
//# sourceMappingURL=socketio.gateway.js.map