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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redis_constants_1 = require("./redis.constants");
let RedisService = class RedisService {
    constructor(redisSubscriberClient, redisPublisherClient) {
        this.redisSubscriberClient = redisSubscriberClient;
        this.redisPublisherClient = redisPublisherClient;
    }
    fromEvent(eventName) {
        this.redisSubscriberClient.subscribe(eventName);
        return new rxjs_1.Observable((observer) => this.redisSubscriberClient.on('message', (channel, message) => observer.next({ channel, message }))).pipe((0, operators_1.filter)(({ channel }) => channel === eventName), (0, operators_1.map)(({ message }) => JSON.parse(message)));
    }
    async publish(channel, value) {
        return new Promise((resolve, reject) => {
            return this.redisPublisherClient.publish(channel, JSON.stringify(value), (error, reply) => {
                if (error) {
                    return reject(error);
                }
                return resolve(reply);
            });
        });
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_constants_1.REDIS_SUBSCRIBER_CLIENT)),
    __param(1, (0, common_1.Inject)(redis_constants_1.REDIS_PUBLISHER_CLIENT)),
    __metadata("design:paramtypes", [Object, Object])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map