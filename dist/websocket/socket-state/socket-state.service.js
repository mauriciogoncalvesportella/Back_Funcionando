"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketStateService = void 0;
const common_1 = require("@nestjs/common");
let SocketStateService = class SocketStateService {
    constructor() {
        this.socketState = {};
        this.socketsByRoom = {};
    }
    add(socket) {
        var _a;
        const cduser = socket.auth.cd;
        this.socketState[cduser] = (_a = this.socketState[cduser]) !== null && _a !== void 0 ? _a : [];
        this.socketState[cduser].push(socket);
        return true;
    }
    joinRoom(socket, room) {
        var _a;
        this.socketsByRoom[room] = (_a = this.socketsByRoom[room]) !== null && _a !== void 0 ? _a : [];
        this.socketsByRoom[room].push(socket);
    }
    remove(socket) {
        common_1.Logger.log(`[WebSocketStateService] Remove ${socket.auth.idlogin} ${socket.id}`);
        const cd = socket.auth.cd;
        const id = socket.id;
        const userSocketIndex = this.socketState[cd].findIndex(socket => socket.id === id);
        if (userSocketIndex >= 0) {
            this.socketState[cd].splice(userSocketIndex, 1);
        }
        for (const room in this.socketsByRoom) {
            const index = this.socketsByRoom[room].findIndex(socket => socket.id === id);
            if (index >= 0) {
                this.socketsByRoom[room].splice(index, 1);
            }
        }
    }
    getByRoom(room) {
        return this.socketsByRoom[room];
    }
    getSocketsByCd(cd) {
        return this.socketState[cd];
    }
};
SocketStateService = __decorate([
    (0, common_1.Injectable)()
], SocketStateService);
exports.SocketStateService = SocketStateService;
//# sourceMappingURL=socket-state.service.js.map