import { Provider } from '@nestjs/common';
import * as Redis from 'ioredis';
export type RedisClient = Redis.Redis;
export declare const redisProviders: Provider[];
