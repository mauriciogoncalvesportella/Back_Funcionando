import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket, Server, ServerOptions } from 'socket.io';
import { AuthUser } from 'src/auth/Auth.interfaces';
import { AuthService } from 'src/auth/auth.service';
import { SocketStateService } from './socket-state.service';
export interface AuthenticatedSocket extends Socket {
    auth: AuthUser;
}
export declare class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
    private readonly app;
    private readonly socketStateService;
    private readonly authService;
    constructor(app: INestApplicationContext, socketStateService: SocketStateService, authService: AuthService);
    private server;
    create(port: number, options?: ServerOptions): Server;
    bindClientConnect(server: Server, callback: Function): void;
}
