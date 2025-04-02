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
exports.MonitorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const moment = require("moment-timezone");
const acao_entity_1 = require("../ticket/acao.entity");
const date_fns_tz_1 = require("date-fns-tz");
const date_fns_1 = require("date-fns");
const ticket_entity_1 = require("../ticket/ticket.entity");
let MonitorService = class MonitorService {
    constructor(atendimentoRepository, acaoRepository, userRepository) {
        this.atendimentoRepository = atendimentoRepository;
        this.acaoRepository = acaoRepository;
        this.userRepository = userRepository;
    }
    async removeMonitorCache(atendimento, force = false) {
        if (force) {
            return;
        }
        const todayStr = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
        const dtcriacao = (0, date_fns_1.format)(atendimento.dtcriacao, 'yyyy-MM-dd');
        if (todayStr === dtcriacao) {
        }
    }
    async monitor(date, user) {
        const todayStr = (0, date_fns_1.format)((0, date_fns_tz_1.utcToZonedTime)(new Date(), 'America/Sao_Paulo'), 'yyyy-MM-dd');
        let isToday = false;
        const dtinicio = moment.tz(`${date} 00:00`, 'America/Sao_Paulo').utc().format();
        const dtfim = moment.tz(`${date} 23:59`, 'America/Sao_Paulo').utc().format();
        const filters = {
            dtinicio,
            dtfim
        };
        const qbAcoes = this.acaoRepository.createQueryBuilder('acao')
            .leftJoinAndMapOne('acao.servico', 'acao.cdservico', 'servico')
            .leftJoinAndMapOne('acao.ticket', 'acao.cdticket', 'ticket')
            .leftJoinAndMapOne('ticket.atendimento', 'ticket.cdatendimento', 'atendimento')
            .where("servico.dtinicio >= :dtinicio")
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.andWhere("servico.dtfim < :dtfim", { dtfim: filters.dtfim })
                .orWhere("servico.dtfim is null");
        }))
            .setParameters(filters);
        const qbUserAtendimentos = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndMapMany('user.atendimentos', 'user.atendimentos', 'atendimento')
            .leftJoinAndMapOne("atendimento.chave", "atendimento.cdchave", "chave")
            .leftJoinAndMapOne("atendimento.ticket", "atendimento.cdticket", "ticket")
            .leftJoinAndMapOne("atendimento.motivo", "atendimento.cdmotivo", "motivo")
            .leftJoinAndMapOne("atendimento.origem", "atendimento.cdorigem", "origem")
            .where("atendimento.dtinicio >= :dtinicio")
            .andWhere("atendimento.dtinicio < :dtfim ")
            .setParameters(filters);
        if (!user.roles.find(it => it === 'monitor.all')) {
            qbUserAtendimentos.andWhere("user.cd = :cduser", { cduser: user.cd });
            qbAcoes.andWhere('acao.cduser = :cduser', { cduser: user.cd });
        }
        const userAtendimentos = await qbUserAtendimentos.select(['user', 'atendimento', 'chave.idfantasia', 'origem', 'chave.cd', 'user.idlogin', 'user.cd', 'motivo.nmmotivo']).getMany();
        const acoes = await qbAcoes.select(['acao', 'servico', 'ticket', 'atendimento']).getMany();
        const ret = {
            userAtendimentos,
            acoes,
        };
        return ret;
    }
    async allAcaoService(dtinicio, dtfim, manager) {
        return await manager.createQueryBuilder(acao_entity_1.AcaoEntity, 'acao')
            .leftJoinAndMapOne('acao.servico', 'acao.cdservico', 'servico')
            .andWhere("servico.dtinicio >= :dtinicio")
            .andWhere("servico.dtfim < :dtfim")
            .setParameters({ dtinicio, dtfim })
            .getMany();
    }
};
MonitorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atendimento_entity_1.AtendimentoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(acao_entity_1.AcaoEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MonitorService);
exports.MonitorService = MonitorService;
//# sourceMappingURL=monitor.service.js.map