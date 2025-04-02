import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { redisProviders } from './redis.provider';

@Module({
  providers: [...redisProviders, RedisService],
  exports: [...redisProviders, RedisService]
})
export class RedisModule {}
