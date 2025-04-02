import { Observable } from 'rxjs';
import { RedisClient } from './redis.provider';
export interface RedisSubscribeMessage {
    readonly message: string;
    readonly channel: string;
}
export declare class RedisService {
    private readonly redisSubscriberClient;
    private readonly redisPublisherClient;
    constructor(redisSubscriberClient: RedisClient, redisPublisherClient: RedisClient);
    fromEvent<T>(eventName: string): Observable<T>;
    publish(channel: string, value: unknown): Promise<number>;
}
