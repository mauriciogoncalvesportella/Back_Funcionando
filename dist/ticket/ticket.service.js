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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const urgencia_entity_1 = require("./urgencia.entity");
const typeorm_2 = require("typeorm");
const situacao_entity_1 = require("./situacao.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const ticket_dto_1 = require("./ticket.dto");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../user/user.entity");
const acao_entity_1 = require("./acao.entity");
const atendimento_service_1 = require("../atendimento/atendimento.service");
const motivo_entity_1 = require("../atendimento/motivo.entity");
const acao_service_1 = require("./acao.service");
const moment = require("moment-timezone");
const chave_entity_1 = require("../chave/chave.entity");
const origem_entity_1 = require("../atendimento/origem.entity");
let TicketService = class TicketService {
    constructor(acaoService, atendimentoService, ticketRepository, urgenciaRepository, motivoRepository, situacaoRepository, origemRepository, solicitanteRepository, userRepository, acaoRepository, chaveRepository, connection) {
        this.acaoService = acaoService;
        this.atendimentoService = atendimentoService;
        this.ticketRepository = ticketRepository;
        this.urgenciaRepository = urgenciaRepository;
        this.motivoRepository = motivoRepository;
        this.situacaoRepository = situacaoRepository;
        this.origemRepository = origemRepository;
        this.solicitanteRepository = solicitanteRepository;
        this.userRepository = userRepository;
        this.acaoRepository = acaoRepository;
        this.chaveRepository = chaveRepository;
        this.connection = connection;
    }
    async getTicket(user, cd) {
        const dto = new ticket_dto_1.TicketFilterDTO;
        dto.cd = [cd];
        dto.users = null;
        const ticket = await this.allFilterQueryBuilder(dto, user).getOne();
        return ticket;
    }
    async allUsersFromTicket(cdticket, user) {
        let tickets = await this.ticketRepository.createQueryBuilder('ticket')
            .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
            .andWhere('ticket.cd in (:...cdticket)', { cdticket })
            .select(['ticket.cd', 'users.cd'])
            .getMany();
        if (!user.roles.find(it => it === 'tickets.others')) {
            for (const ticket of tickets) {
                if (!ticket.users.find(currUser => currUser.cd === user.cd)) {
                    throw new common_1.ForbiddenException;
                }
            }
        }
        return tickets;
    }
    async removeKanbanCache(ticket) {
        if (ticket._cdsituacao !== 4) {
        }
    }
    async kanban(user) {
        let qb = this.userRepository.createQueryBuilder('users');
        if (user.roles.find(it => it === 'tickets.others') == null) {
            qb.andWhere('users.cd = :cduser', { cduser: user.cd });
        }
        qb.leftJoinAndMapMany('users.tickets', 'users.tickets', 'tickets')
            .andWhere('tickets.cdsituacao != 4')
            .leftJoinAndMapOne('tickets.atendimento', 'tickets.cdatendimento', 'atendimento')
            .select(['users', 'tickets', 'atendimento']);
        const result = await qb.getMany();
        return result;
    }
    async allFilterPaginate(dto, user) {
        var _a, _b;
        const qb = this.allFilterQueryBuilder(dto, user);
        const skip = dto.options.itemsPerPage * (dto.options.page - 1);
        const take = dto.options.itemsPerPage;
        if (((_b = (_a = dto.options) === null || _a === void 0 ? void 0 : _a.sortBy) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const order = dto.options.sortDesc[0] ? 'DESC' : 'ASC';
            const mapSortBy = {
                'cd': 'ticket.cd',
                'dtcriacao': 'ticket.cd',
                'nmurgencia': 'ticket.cdurgencia',
                'nmsituacao': 'ticket.cdsituacao',
            };
            const sortBy = mapSortBy[dto.options.sortBy[0]];
            qb.orderBy(sortBy, order);
        }
        else {
            qb.orderBy('ticket.cd', 'DESC');
        }
        qb.skip(skip);
        qb.take(take);
        return await qb.getManyAndCount();
    }
    async allFilter(data, user) {
        const qb = this.allFilterQueryBuilder(data, user);
        return await qb.getManyAndCount();
    }
    allFilterQueryBuilder(data, user) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let qb = this.ticketRepository.createQueryBuilder('ticket');
        qb.leftJoinAndMapMany('ticket.users', 'ticket.users', 'users');
        qb.leftJoinAndMapOne('ticket.situacao', 'ticket.cdsituacao', 'situacao');
        qb.leftJoinAndMapOne('ticket.atendimento', 'ticket.cdatendimento', 'atendimento');
        qb.leftJoinAndMapOne('ticket.urgencia', 'ticket.cdurgencia', 'urgencia');
        qb.leftJoinAndMapOne('atendimento.motivo', 'atendimento.cdmotivo', 'motivo');
        if (((_a = data === null || data === void 0 ? void 0 : data.cd) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            qb.andWhere('ticket.cd in (:...cd)', { cd: data.cd });
        }
        if (data === null || data === void 0 ? void 0 : data.dt0) {
            let dtinicio = moment.tz(`${data.dt0} 00:00`, 'America/Sao_Paulo').utc().format();
            let dtfim = moment.tz(`${(_b = data.dt1) !== null && _b !== void 0 ? _b : data.dt0} 23:59`, 'America/Sao_Paulo').utc().format();
            if (dtinicio > dtfim) {
                const temp = dtinicio;
                dtinicio = dtfim;
                dtfim = temp;
            }
            qb.andWhere('ticket.dtcriacao >= :dtinicio AND ticket.dtcriacao <= :dtfim', { dtinicio, dtfim });
        }
        if (!user.roles.find(it => it === 'tickets.others')) {
            qb.andWhere('users.cd = :cduser', { cduser: user.cd });
        }
        else if (((_c = data.users) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            qb.andWhere('users.cd in (:...userlist)', { userlist: data.users });
        }
        if (((_d = data === null || data === void 0 ? void 0 : data.motivo) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            qb.andWhere('motivo.cd in (:...motivo)', { motivo: data.motivo });
        }
        if (((_e = data === null || data === void 0 ? void 0 : data.situacao) === null || _e === void 0 ? void 0 : _e.length) > 0) {
            qb.andWhere('situacao.cd in (:...situacao)', { situacao: data.situacao });
        }
        if (((_f = data === null || data === void 0 ? void 0 : data.fgticket) === null || _f === void 0 ? void 0 : _f.length) > 0) {
            qb.andWhere('ticket.fgticket in (:...fgticket)', { fgticket: data.fgticket });
        }
        if (((_g = data === null || data === void 0 ? void 0 : data.urgencia) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            qb.andWhere('urgencia.cd in (:...urgencia)', { urgencia: data.urgencia });
        }
        if (((_h = data.chaves) === null || _h === void 0 ? void 0 : _h.length) > 0) {
            qb.andWhere('atendimento.cdchave in (:...chaves)', { chaves: data.chaves });
        }
        if ((_j = data.options) === null || _j === void 0 ? void 0 : _j.searchPattern) {
            qb.andWhere(`(UPPER(nmtitulo) like UPPER(:pattern)
        OR UPPER(motivo.nmmotivo) like UPPER(:pattern)
        OR UPPER(situacao.nmsituacao) like UPPER(:pattern)
        OR UPPER(urgencia.nmurgencia) like UPPER(:pattern)
        OR UPPER(users.idlogin) like UPPER(:pattern)
        OR UPPER(users.idnome) like UPPER(:pattern))`, {
                pattern: `%${data.options.searchPattern}%`,
            });
            const cdPattern = parseInt(data.options.searchPattern);
            if (cdPattern) {
                qb.orWhere('ticket.cd = :cdPattern', { cdPattern });
            }
        }
        qb.select(['ticket', 'atendimento']);
        return qb;
    }
    async addTicketAcao(data, user) {
        const ticket = data.ticket;
        const acao = data.acao;
        let retTicket = null;
        let retAcao = null;
        await this.connection.transaction(async (manager) => {
            retTicket = await this.addTicket(ticket, acao, user, manager);
            acao.cdticket = retTicket.cd;
            acao.cduser = user.cd;
            acao.fgstatus = 1;
            retAcao = await this.acaoService.addAcao(acao, user, manager, false);
            await this.atendimentoService.done({ cd: data.ticket.cdatendimento }, user, manager);
        });
        return {
            ticket: Object.assign({}, retTicket),
            acao: Object.assign({}, retAcao),
        };
    }
    async addTicket(data, acao, user, manager = null, emitAcao = false) {
        let newTicket = null;
        let oldTicket = null;
        data.dtprevisao = moment.tz(data.dtprevisao, 'America/Sao_Paulo').utc().toDate();
        if (data.cdresponsavel != null && !data.users.includes(data.cdresponsavel)) {
            data.users.push(data.cdresponsavel);
        }
        const getTicket = async (cd) => {
            return await this.ticketRepository.findOneOrFail(cd, { relations: ['users', 'cdurgencia', 'cdsolicitante', 'cdsituacao', 'cdatendimento'] });
        };
        if (emitAcao) {
            oldTicket = await getTicket(data.cd);
        }
        const ticketEntity = new ticket_entity_1.TicketEntity();
        if (acao !== null) {
            ticketEntity.nmtitulo = acao.nmassunto;
        }
        ticketEntity.users = data.users.map(cduser => new user_entity_1.UserEntity(cduser));
        delete data.users;
        Object.assign(ticketEntity, data);
        let ticket = null;
        if (manager) {
            ticket = await manager.save(ticketEntity);
            if (emitAcao) {
                await this.acaoService.addAcaoAfterTicketUpdate(oldTicket, ticket, user, manager);
            }
        }
        else {
            await this.connection.transaction(async (currManager) => {
                ticket = await currManager.save(ticketEntity);
                if (emitAcao) {
                    newTicket = await getTicket(data.cd);
                    await this.acaoService.addAcaoAfterTicketUpdate(oldTicket, ticket, user, currManager);
                }
            });
        }
        return {
            cd: ticket.cd,
        };
    }
    async allMeta() {
        try {
            const urgencia = await this.urgenciaRepository.find();
            const motivo = await this.motivoRepository.find();
            const situacao = await this.situacaoRepository.find();
            const origem = await this.origemRepository.find();
            return {
                urgencia,
                motivo,
                situacao,
                origem,
            };
        }
        catch (err) {
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async changeSituacao(data, user, manager = null) {
        const qb = this.ticketRepository
            .createQueryBuilder('ticket')
            .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
            .andWhere('ticket.cd = :cd', { cd: data.cd });
        if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
            qb.andWhere('users.cd = :cduser', { cduser: user.cd });
        }
        const ticket = await qb.getOne();
        if (!ticket || ticket.users.length === 0) {
            throw new common_1.ForbiddenException;
        }
        if (ticket.cdsituacao !== data.cdsituacao) {
            delete ticket.users;
            const ticketEntity = this.ticketRepository.create(ticket);
            for (const cduser in ticketEntity.jskanbanorder) {
                ticketEntity[cduser] = 0;
            }
            ticketEntity.cdsituacao = data.cdsituacao;
            await (manager === null || manager === void 0 ? void 0 : manager.save(ticketEntity)) || await this.ticketRepository.save(ticketEntity);
        }
    }
    async changeCdresponsavel(cdticket, cdresponsavel, user, manager = null) {
        const qb = this.ticketRepository
            .createQueryBuilder('ticket')
            .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
            .andWhere('ticket.cd = :cd', { cd: cdticket });
        if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
            qb.andWhere('users.cd = :cduser', { cduser: user.cd });
        }
        const ticket = await qb.getOne();
        if (!ticket || !ticket.users.length) {
            throw new common_1.ForbiddenException;
        }
        const newTicket = new ticket_entity_1.TicketEntity();
        newTicket.users = ticket.users;
        if (!ticket.users.find(currUser => currUser.cd === cdresponsavel)) {
            newTicket.users.push(new user_entity_1.UserEntity(cdresponsavel));
        }
        if (ticket.cdresponsavel !== cdresponsavel) {
            newTicket.cd = cdticket;
            newTicket.cdresponsavel = cdresponsavel;
            await manager.save(newTicket);
        }
    }
    async updateKanbanOrder(data, user) {
        console.log(data);
        const ticketCdList = Object.keys(data);
        const qb = this.ticketRepository
            .createQueryBuilder('ticket')
            .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
            .andWhere('ticket.cd in (:...ticketCdList)', { ticketCdList });
        if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
            qb.andWhere('users.cd = :cduser', { cduser: user.cd });
        }
        const tickets = await qb.getMany();
        if (!tickets || tickets.length === 0) {
            throw new common_1.ForbiddenException;
        }
        for (const ticket of tickets) {
            for (const userCd in data[ticket.cd]) {
                ticket.jskanbanorder[userCd] = data[ticket.cd][userCd];
            }
            delete ticket.users;
        }
        await this.ticketRepository.save(tickets);
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => acao_service_1.AcaoService))),
    __param(2, (0, typeorm_1.InjectRepository)(ticket_entity_1.TicketEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(urgencia_entity_1.UrgenciaEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(motivo_entity_1.MotivoEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(situacao_entity_1.SituacaoEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(origem_entity_1.OrigemEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(solicitante_entity_1.SolicitanteEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(acao_entity_1.AcaoEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(chave_entity_1.ChaveEntity)),
    __param(11, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [acao_service_1.AcaoService,
        atendimento_service_1.AtendimentoService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map