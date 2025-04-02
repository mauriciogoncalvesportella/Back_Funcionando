import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { AuthService } from './auth/auth.service';
import { Socket } from 'socket.io';
declare class Client {
    socket: Socket;
    user: any;
    rooms: any;
    constructor(socket: Socket, user: any, rooms?: any);
    joinedAtRoom(room: string): any;
}
export declare class SocketioGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    constructor(authService: AuthService);
    private server;
    private clients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    disconnect(user: any): void;
    notify(event: string, data: any, user: any, room?: string): void;
    getClientSocket(identifier: number | string): Client;
    handleEvent(client: Socket): void;
}
export {};
