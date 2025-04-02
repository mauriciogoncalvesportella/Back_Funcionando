export class RedisSocketEventEmitDTO {
  constructor (
    public readonly event: string,
    public readonly data: unknown,
    public readonly cduser?: number,
    public readonly socketId?: string,
  ) {  }
}

export class RedisSocketEventRoomDTO extends RedisSocketEventEmitDTO {
  constructor (
    public readonly room: string,
    event: string,
    data: unknown,
    cduser?: number,
    socketId?: string,
  ) {
    super(event, data, cduser, socketId)
  }
}

export class RedisSocketEventUserDTO extends RedisSocketEventEmitDTO {
  constructor (
    public readonly cduserTarget: number,
    event: string,
    data: unknown,
    cduser?: number,
    socketId?: string,
  ) {
    super(event, data, cduser, socketId)
  }
}
