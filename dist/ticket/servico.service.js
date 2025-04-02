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
exports.ServicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const servico_entity_1 = require("./servico.entity");
const typeorm_2 = require("typeorm");
let ServicoService = class ServicoService {
    constructor(servicoRepository, connection) {
        this.servicoRepository = servicoRepository;
        this.connection = connection;
    }
    async start(user, cdStart, currManager = null) {
        const manager = currManager || this.connection.manager;
        await this.stopStart(user, cdStart, manager);
    }
    async stopAll(user, currManager = null) {
        const manager = currManager || this.connection.manager;
        await this.stopStart(user, -1, manager);
    }
    async close(user, cdservico, manager) {
        var _a;
        await this.stopAll(user, manager);
        const servico = await manager.findOneOrFail(servico_entity_1.ServicoEntity, cdservico);
        if (servico._cduser != user.cd && !user.roles.includes('tickets.others.rewrite')) {
            throw new common_1.ForbiddenException;
        }
        if ((_a = servico.jslista) === null || _a === void 0 ? void 0 : _a.length) {
            const dtfim = new Date();
            const lastPeriod = servico.jslista[servico.jslista.length - 1];
            lastPeriod.dtfim = dtfim;
            servico.dtfim = dtfim;
            servico.ntotal = servico.jslista.reduce((acc, curr) => acc + (new Date(curr.dtfim).getTime() - new Date(curr.dtinicio).getTime()), 0);
            manager.save(servico_entity_1.ServicoEntity, servico);
            return servico.ntotal;
        }
        return 0;
    }
    async stopStart(user, cdStart = -1, currManager = null) {
        var _a;
        let manager = currManager || this.connection.manager;
        const servicos = await manager
            .createQueryBuilder(servico_entity_1.ServicoEntity, 'servico')
            .andWhere('servico.cduser = :cduser AND servico.dtfim is NULL', { cduser: user.cd })
            .getMany();
        let checkSave = false;
        const dtfim = new Date();
        for (const servico of servicos) {
            if (servico.cd !== cdStart && ((_a = servico.jslista) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const lastPeriod = servico.jslista.slice(-1)[0];
                if (lastPeriod.dtfim == null) {
                    checkSave = true;
                    lastPeriod.dtfim = dtfim;
                }
            }
            else if (servico.cd === cdStart) {
                servico.jslista = servico.jslista || [];
                if (servico.jslista.length === 0 || servico.jslista[servico.jslista.length - 1].dtfim != null) {
                    checkSave = true;
                    servico.jslista.push({
                        dtinicio: new Date(),
                        dtfim: null,
                    });
                }
            }
        }
        if (checkSave) {
            await manager.save(servicos);
        }
    }
};
ServicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servico_entity_1.ServicoEntity)),
    __param(1, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], ServicoService);
exports.ServicoService = ServicoService;
//# sourceMappingURL=servico.service.js.map