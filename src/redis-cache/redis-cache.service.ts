import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager'

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  private readonly logger = new Logger(RedisCacheService.name, true)

  async get (key: string): Promise<any> {
    const ret = await this.cache.get(key)
    if (ret) {
      this.logger.log(`GET "${key}"`)
    }
    return ret
  }

  async set (key: string, value: any): Promise<void> {
    this.logger.log(`SET "${key}"`)
    await this.cache.set(key, value)
  }

  async destroy (key: string): Promise<void> {
    this.logger.log(`DESTROY "${key}"`)
    this.logger.error(`DESTROY "${key}"`)
    await this.cache.del(key)
  }
}
