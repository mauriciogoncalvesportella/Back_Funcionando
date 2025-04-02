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
exports.TipoAgendamentoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipoagendamento_entity_1 = require("./tipoagendamento.entity");
const typeorm_2 = require("typeorm");
const interfaces_1 = require("../shared/interfaces");
let TipoAgendamentoService = class TipoAgendamentoService {
    constructor(tipoAgendamentoRepository) {
        this.tipoAgendamentoRepository = tipoAgendamentoRepository;
    }
    async add(data) {
        const entities = data.map(entity => this.tipoAgendamentoRepository.create(entity));
        return await this.tipoAgendamentoRepository.save(entities);
    }
    async all() {
        return await this.tipoAgendamentoRepository.find();
    }
    async update(data) {
        return await this.tipoAgendamentoRepository.save(data);
    }
    async delete(cd) {
        await this.tipoAgendamentoRepository.delete(cd);
    }
    async nextOrdem() {
        const maxOrdem = await this.tipoAgendamentoRepository.createQueryBuilder('tipoagendamento')
            .select('MAX(tipoagendamento.nordem)', 'max')
            .getRawOne();
        if (maxOrdem.max == null) {
            return 0;
        }
        return maxOrdem.max + 1;
    }
};
TipoAgendamentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipoagendamento_entity_1.TipoAgendamentoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TipoAgendamentoService);
exports.TipoAgendamentoService = TipoAgendamentoService;
//# sourceMappingURL=tpagendamento.service.js.map