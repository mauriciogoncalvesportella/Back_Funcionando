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
exports.SituacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const situacao_entity_1 = require("./situacao.entity");
const atendimento_dto_1 = require("../atendimento/atendimento.dto");
const interfaces_1 = require("../shared/interfaces");
let SituacaoService = class SituacaoService {
    constructor(situacaoRepository) {
        this.situacaoRepository = situacaoRepository;
    }
    async add(data) {
        return await this.situacaoRepository.save(data);
    }
    async all() {
        return await this.situacaoRepository.find();
    }
    async update(data) {
        return await this.situacaoRepository.save(data);
    }
    async delete(cd) {
        await this.situacaoRepository.delete(cd);
    }
    async nextOrdem() {
        const maxOrdem = await this.situacaoRepository.createQueryBuilder('situacao')
            .select('MAX(situacao.nordem)', 'max')
            .getRawOne();
        if (maxOrdem.max == null) {
            return 0;
        }
        return maxOrdem.max + 1;
    }
};
SituacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(situacao_entity_1.SituacaoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SituacaoService);
exports.SituacaoService = SituacaoService;
//# sourceMappingURL=situacao.service.js.map