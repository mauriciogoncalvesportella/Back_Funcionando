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
exports.MotivoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const motivo_entity_1 = require("./motivo.entity");
const typeorm_2 = require("typeorm");
const interfaces_1 = require("../shared/interfaces");
let MotivoService = class MotivoService {
    constructor(motivoRepository) {
        this.motivoRepository = motivoRepository;
    }
    async add(data) {
        return await this.motivoRepository.save(data);
    }
    async all() {
        return await this.motivoRepository.find();
    }
    async update(data) {
        return await this.motivoRepository.save(data);
    }
    async delete(cd) {
        await this.motivoRepository.delete(cd);
    }
    async nextOrdem() {
        const maxOrdem = await this.motivoRepository.createQueryBuilder('motivo')
            .select('MAX(motivo.nordem)', 'max')
            .getRawOne();
        return maxOrdem.max == null ? 0 : maxOrdem.max + 1;
    }
};
MotivoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(motivo_entity_1.MotivoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MotivoService);
exports.MotivoService = MotivoService;
//# sourceMappingURL=motivo.service.js.map