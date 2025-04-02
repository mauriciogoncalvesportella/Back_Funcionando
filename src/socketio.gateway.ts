import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import {AuthService} from './auth/auth.service';
import {Server, Socket} from 'socket.io';
import {Logger, Inject, forwardRef} from '@nestjs/common';

class Client {
  constructor(
    public socket: Socket,
    public user: any,
    public rooms: any = {},
  ) {  }

  joinedAtRoom (room: string) {
    return this.rooms.includes(room)
  }
}

class ClientList {
  private clients: Array<Client> = []
  private clientsByRoom: { [id: string]: Client[] } = {}
  private getFromID (id: string) {
    return this.clients.find(client => client.socket.id === id)
  }
  private getFromCD (cd: number) {
    return this.clients.find(client => client.user.cd === cd)
  }

  getClient (identifier: number | string) {
    if (typeof(identifier) === 'string') {
      return this.getFromID(identifier)
    } else if (typeof(identifier) === 'number') {
      return this.getFromCD(identifier)
    }
  }

  getIndex (identifier: number | string) {
    switch (typeof(identifier)) {
      case 'string': return this.clients.findIndex(client => client.socket.id === identifier)
      case 'number': return this.clients.findIndex(client => client.user.cd === identifier)
      default: return null
    }
  }

  add (client: Client) {
    this.clients.push(client)
  }

  joinRoom (identifier: string | number, room: string) {
    const client = this.getClient(identifier)
    if (client) {
      client.rooms[room] = true
      this.clientsByRoom[room] = this.clientsByRoom[room] ?? []
      this.clientsByRoom[room].push(client)
    }
  }

  notify (event: string, msg: any, user: any | null, room: string = null) {
    let clients: Client[] = room ? this.clientsByRoom[room] : this.clients 
    for (const client of clients) {
      if (client.user.cd !== user.cd) {
        const ev = room ? `${room}/${event}` : event
        client.socket.emit(ev, msg)
      }
    }
  }

  leaveRoom (identifier: string | number, room: string) {
    const client = this.getClient(identifier)
    delete client.rooms[room]
  }

  disconnect (identifier: string | number) {
    const client = this.getClient(identifier)
    const index = this.getIndex(identifier)
    if (index >= 0 && client) {
      this.clients.splice(index, 1)
      client.socket.disconnect()
    }
  }
}

@WebSocketGateway({ path: '/api/socketio', transports: ['websocket', 'polling'] })
export class SocketioGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  @WebSocketServer()
  private server: Server;
  private clients: ClientList = new ClientList()

  handleConnection(client: Socket) {
    const cookies: string = client.handshake.headers.cookie
    const token = cookies?.split('; ')?.find((cookie: string) => cookie.startsWith('Authentication'))?.split('=')[1];
    if (token && this.authService.validateToken(token)) {
      const user = this.authService.decode(token)
      this.clients.add(new Client(client, user))
      Logger.log(`${user.idlogin} connected to the socket`)
      return
    }
    client.disconnect(true)
  }

  handleDisconnect(client: Socket) {
    this.clients.disconnect(client.id)
    Logger.log(`${client.id} disconnected`)
  }

  disconnect (user: any) {
    this.clients.disconnect(user.cd)
    Logger.log(`${user.idlogin} forced to disconnect`)
  }

  notify (event: string, data: any, user: any, room: string = null) {
    Logger.log(`${event}, ${user.idlogin}`)
    this.clients.notify(event, data, user, room)
  }

  getClientSocket (identifier: number | string): Client {
    return this.clients.getClient(identifier)
  }

  @SubscribeMessage('JoinFilaEspera')
  handleEvent(@ConnectedSocket() client: Socket) {
    const { user } = this.clients.getClient(client.id)
    Logger.log(`${user?.idlogin} joined to FilaEspera room`)
    this.clients.joinRoom(client.id, 'FilaEspera')
  }
}
