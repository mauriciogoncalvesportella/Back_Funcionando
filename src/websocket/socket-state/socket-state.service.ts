import { Injectable, Logger } from '@nestjs/common';
import { AuthenticatedSocket } from './socket-state.adapter';

@Injectable()
export class SocketStateService {
  private socketState: { [cd: number]: AuthenticatedSocket[] } = {}
  private socketsByRoom: { [room: string]: AuthenticatedSocket[] } = {}

  public add (socket: AuthenticatedSocket): boolean {
    const cduser = socket.auth.cd
    this.socketState[cduser] = this.socketState[cduser] ?? []
    this.socketState[cduser].push(socket)
    return true
  }

  public joinRoom (socket: AuthenticatedSocket, room: string): void {
    this.socketsByRoom[room] = this.socketsByRoom[room] ?? []
    this.socketsByRoom[room].push(socket)
  }

  public remove (socket: AuthenticatedSocket): void {
    Logger.log(`[WebSocketStateService] Remove ${socket.auth.idlogin} ${socket.id}`)
    const cd = socket.auth.cd
    const id = socket.id
    
    const userSocketIndex = this.socketState[cd].findIndex(socket => socket.id === id)
    if (userSocketIndex >= 0) {
      this.socketState[cd].splice(userSocketIndex, 1)
    }

    for (const room in this.socketsByRoom) {
      const index = this.socketsByRoom[room].findIndex(socket => socket.id === id)
      if (index >= 0) {
        this.socketsByRoom[room].splice(index, 1)
      }
    }
  }

  public getByRoom (room: string): AuthenticatedSocket[] {
    return this.socketsByRoom[room]
  }

  public getSocketsByCd (cd: number): AuthenticatedSocket[] {
    return this.socketState[cd]
  }
}
