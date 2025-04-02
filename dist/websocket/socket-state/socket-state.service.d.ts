import { AuthenticatedSocket } from './socket-state.adapter';
export declare class SocketStateService {
    private socketState;
    private socketsByRoom;
    add(socket: AuthenticatedSocket): boolean;
    joinRoom(socket: AuthenticatedSocket, room: string): void;
    remove(socket: AuthenticatedSocket): void;
    getByRoom(room: string): AuthenticatedSocket[];
    getSocketsByCd(cd: number): AuthenticatedSocket[];
}
