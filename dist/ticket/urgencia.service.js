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
exports.UrgenciaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const urgencia_entity_1 = require("./urgencia.entity");
const interfaces_1 = require("../shared/interfaces");
let UrgenciaService = class UrgenciaService {
    constructor(urgenciaRepository) {
        this.urgenciaRepository = urgenciaRepository;
    }
    async add(data) {
        return await this.urgenciaRepository.save(data);
    }
    async all() {
        return await this.urgenciaRepository.find();
    }
    async update(data) {
        return await this.urgenciaRepository.save(data);
    }
    async delete(cd) {
        await this.urgenciaRepository.delete(cd);
    }
    async nextOrdem() {
        const maxOrdem = await this.urgenciaRepository.createQueryBuilder('urgencia')
            .select('MAX(urgencia.nordem)', 'max')
            .getRawOne();
        return maxOrdem.max == null ? 0 : maxOrdem.max + 1;
    }
};
UrgenciaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(urgencia_entity_1.UrgenciaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UrgenciaService);
exports.UrgenciaService = UrgenciaService;
//# sourceMappingURL=urgencia.service.js.map