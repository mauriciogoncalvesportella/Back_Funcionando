import { Cache } from 'cache-manager';
export declare class RedisCacheService {
    private readonly cache;
    constructor(cache: Cache);
    private readonly logger;
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    destroy(key: string): Promise<void>;
}
