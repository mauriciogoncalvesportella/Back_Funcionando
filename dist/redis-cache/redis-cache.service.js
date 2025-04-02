"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RedisCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const common_1 = require("@nestjs/common");
let RedisCacheService = RedisCacheService_1 = class RedisCacheService {
    constructor(cache) {
        this.cache = cache;
        this.logger = new common_1.Logger(RedisCacheService_1.name, true);
    }
    async get(key) {
        const ret = await this.cache.get(key);
        if (ret) {
            this.logger.log(`GET "${key}"`);
        }
        return ret;
    }
    async set(key, value) {
        this.logger.log(`SET "${key}"`);
        await this.cache.set(key, value);
    }
    async destroy(key) {
        this.logger.log(`DESTROY "${key}"`);
        this.logger.error(`DESTROY "${key}"`);
        await this.cache.del(key);
    }
};
RedisCacheService = RedisCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RedisCacheService);
exports.RedisCacheService = RedisCacheService;
//# sourceMappingURL=redis-cache.service.js.map