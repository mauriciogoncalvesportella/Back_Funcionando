"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisProviders = void 0;
const Redis = require("ioredis");
const redis_constants_1 = require("./redis.constants");
exports.redisProviders = [
    {
        useFactory: () => {
            return new Redis({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
            });
        },
        provide: redis_constants_1.REDIS_SUBSCRIBER_CLIENT,
    },
    {
        useFactory: () => {
            return new Redis({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
                tls: {}
            });
        },
        provide: redis_constants_1.REDIS_PUBLISHER_CLIENT,
    },
];
//# sourceMappingURL=redis.provider.js.map