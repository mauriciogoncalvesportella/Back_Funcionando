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
exports.AtendimentoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const atendimento_entity_1 = require("./atendimento.entity");
const typeorm_2 = require("typeorm");
const chave_entity_1 = require("../chave/chave.entity");
const motivo_entity_1 = require("./motivo.entity");
const moment = require("moment-timezone");
const db_filter_1 = require("../shared/db.filter");
const origem_entity_1 = require("./origem.entity");
const fila_espera_entity_1 = require("../fila-espera/fila-espera.entity");
const fila_espera_service_1 = require("../fila-espera/fila-espera.service");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const monitor_service_1 = require("../monitor/monitor.service");
let AtendimentoService = class AtendimentoService {
    constructor(atendimentoRepository, motivoRepository, chaveRepository, origemRepository, filaEsperaRepository, connection, filaEsperaService, websocketGateway) {
        this.atendimentoRepository = atendimentoRepository;
        this.motivoRepository = motivoRepository;
        this.chaveRepository = chaveRepository;
        this.origemRepository = origemRepository;
        this.filaEsperaRepository = filaEsperaRepository;
        this.connection = connection;
        this.filaEsperaService = filaEsperaService;
        this.websocketGateway = websocketGateway;
    }
    async RefreshState() {
        this.atendimentoRepository.find();
    }
    async add(data, user) {
        if (!data.cdchave && !data.cdfila) {
            throw new common_1.HttpException('Invalid Request', common_1.HttpStatus.BAD_REQUEST);
        }
        if (data.cdfila) {
            var filaEntity = await this.filaEsperaRepository.findOneOrFail(data.cdfila);
            data.cdchave = filaEntity._cdchave;
        }
        const dtinicio = new Date().toString();
        const cduser = user.cd;
        let atendimentoEntity = null;
        this.connection.transaction(async (manager) => {
            var _a;
            atendimentoEntity = manager.create(atendimento_entity_1.AtendimentoEntity, Object.assign(Object.assign({}, data), { dtinicio, cduser }));
            atendimentoEntity.cdfila = (_a = data.cdfila) !== null && _a !== void 0 ? _a : null;
            await manager.save(atendimentoEntity);
            if (data.cdfila != null) {
                await this.filaEsperaService.close(data.cdfila, atendimentoEntity.cd, user, manager);
            }
        });
        return atendimentoEntity;
    }
    async getOnline(manager = this.connection.manager) {
        const today = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');
        const dtinicio = moment.tz(`${today} 00:00`, 'America/Sao_Paulo').utc().format();
        const dtfim = moment.tz(`${today} 23:59`, 'America/Sao_Paulo').utc().format();
        return await manager
            .createQueryBuilder(atendimento_entity_1.AtendimentoEntity, 'atendimento')
            .andWhere('atendimento.dtfim is NULL')
            .andWhere('atendimento.fgativo = TRUE')
            .getMany();
    }
    async stopStart(data, user, manager = this.connection.manager) {
        const atendimentos = await manager
            .createQueryBuilder(atendimento_entity_1.AtendimentoEntity, 'atendimento')
            .andWhere('atendimento.cduser = :cduser AND atendimento.dtfim is NULL', { cduser: user.cd })
            .getMany();
        let atendimentoToStart;
        let atendimentoClosed = false;
        for (const atendimento of atendimentos) {
            if (atendimento.cd === data.cdatendimento) {
                atendimentoToStart = atendimento;
            }
            else {
                atendimento.fgativo = false;
            }
            const jslista = atendimento === null || atendimento === void 0 ? void 0 : atendimento.jslista;
            if (jslista != null && jslista.length > 0 && jslista[jslista.length - 1].dtfim == null) {
                atendimentoClosed = true;
                const dtfim = new Date();
                const dtinicio = new Date(jslista[jslista.length - 1].dtinicio).getTime();
                if (dtfim.getTime() - dtinicio > 5e3) {
                    jslista[jslista.length - 1].dtfim = dtfim;
                }
                else {
                    jslista.pop();
                    if (jslista.length === 0) {
                        atendimento.jslista = null;
                    }
                }
            }
        }
        if (data.cdatendimento !== -1 && atendimentoToStart) {
            atendimentoToStart.fgativo = true;
            atendimentoToStart.jslista = atendimentoToStart.jslista || [];
            atendimentoToStart.jslista.push({
                dtinicio: new Date(),
                dtfim: null
            });
        }
        if (atendimentoToStart || atendimentoClosed) {
            this.websocketGateway.notifyRoom('AtendimentosOnline', 'update', atendimentoToStart !== null && atendimentoToStart !== void 0 ? atendimentoToStart : { sleep: true, cduser: user.cd });
        }
        await manager.save(atendimento_entity_1.AtendimentoEntity, atendimentos);
    }
    async all(user) {
        let dtinicio = moment.tz(new Date(), 'America/Sao_Paulo')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        try {
            return await this.atendimentoRepository
                .createQueryBuilder("atendimento")
                .leftJoinAndMapOne("atendimento.chave", "atendimento.cdchave", "chave")
                .leftJoinAndMapOne("atendimento.origem", "atendimento.cdorigem", "origem")
                .leftJoinAndMapOne("atendimento.fila", "atendimento.cdfila", "fila")
                .leftJoinAndMapOne("fila.solicitante", "fila.cdsolicitante", "solicitante")
                .where("atendimento.cduser = :cduser", { cduser: user.cd })
                .andWhere("atendimento.dtfim is NULL")
                .orderBy("atendimento.dtinicio", "ASC")
                .select(["atendimento", "chave.idfantasia", "chave.cd", "origem", "fila", "solicitante"])
                .getMany();
        }
        catch (err) {
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async allAdmin(data, user) {
        var _a, _b, _c;
        let qb = this.atendimentoRepository.createQueryBuilder('atendimento')
            .leftJoinAndMapOne('atendimento.chave', 'atendimento.cdchave', 'chave')
            .leftJoinAndMapOne('atendimento.user', 'atendimento.cduser', 'user')
            .leftJoinAndMapOne('atendimento.origem', 'atendimento.cdorigem', 'origem');
        if (((_a = data.atendimentos) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            qb.andWhere('atendimento.cd IN (:...atendimentos)', { atendimentos: data.atendimentos });
        }
        if (data.notNull) {
            for (const parameter of data.notNull) {
                qb.andWhere(`atendimento.${parameter} is not NULL`);
            }
        }
        if (user.roles.find(it => it === 'atendimento.others')) {
            if (((_b = data.users) === null || _b === void 0 ? void 0 : _b.length) > 0 && data.users[0] != -1)
                qb = qb.andWhere(`atendimento.cduser IN (:...users)`, { users: data.users });
        }
        else {
            qb = qb.andWhere(`atendimento.cduser = :user`, { user: user.cd });
        }
        if (((_c = data.clientes) === null || _c === void 0 ? void 0 : _c.length) > 0)
            qb = qb.andWhere('atendimento.cdchave IN (:...clientes)', { clientes: data.clientes });
        if (data.dtinicio) {
            const dtinicio = moment.tz(data.dtinicio, 'America/Sao_Paulo').utc().format();
            qb = qb.andWhere(`atendimento.dtinicio >= :dtinicio`, { dtinicio: dtinicio });
        }
        if (data.dtfim) {
            const dtfim = moment.tz(data.dtfim, 'America/Sao_Paulo').utc().format();
            qb = qb.andWhere(`atendimento.dtinicio <= :dtfim`, { dtfim: dtfim });
        }
        qb = qb.orderBy('atendimento.dtinicio', 'ASC');
        return await qb.select(['atendimento', 'chave.idfantasia', 'origem', 'chave.cd', 'user.idlogin']).getMany();
    }
    async update(data) {
        try {
            let item = await this.atendimentoRepository.findOneOrFail({ where: { cd: data.cd } });
            const dtinicio = data.dtinicio || item.dtinicio;
            if (data.dtfim) {
                if (data.dtfim < dtinicio) {
                    throw new common_1.HttpException('Horário final inválido', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (data.dtinicio)
                item.dtinicio = new Date(data.dtinicio);
            if (data.dtfim && (data.done || item.dtfim))
                item.dtfim = new Date(data.dtfim);
            if (data.cdchave)
                item.cdchave = data.cdchave;
            if (data.jslista)
                item.jslista = data.jslista;
            await this.atendimentoRepository.save(item);
        }
        catch (err) {
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async changeMotivo(data, user, manager = null) {
        let atendimento = await this.atendimentoRepository.findOneOrFail(data.cdatendimento);
        if (!atendimento.cdticket) {
            atendimento.cdmotivo = data.cdmotivo;
            await (manager === null || manager === void 0 ? void 0 : manager.save(atendimento)) || this.atendimentoRepository.save(atendimento);
            return;
        }
        throw new common_1.BadRequestException;
    }
    async done(data, user, manager = null) {
        let atendimento = await this.atendimentoRepository.findOneOrFail({ cd: data.cd, cduser: user.cd });
        const dtfim = new Date();
        atendimento.dtfim = dtfim;
        const jslista = atendimento.jslista;
        if (jslista != null && jslista[jslista.length - 1].dtfim == null) {
            atendimento.jslista[jslista.length - 1].dtfim = dtfim;
        }
        await (manager === null || manager === void 0 ? void 0 : manager.save(atendimento)) || await this.atendimentoRepository.save(atendimento);
    }
    async destroy(cd) {
        this.atendimentoRepository.delete(cd);
    }
};
AtendimentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atendimento_entity_1.AtendimentoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(motivo_entity_1.MotivoEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(chave_entity_1.ChaveEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(origem_entity_1.OrigemEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(fila_espera_entity_1.FilaEsperaEntity)),
    __param(5, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection,
        fila_espera_service_1.FilaEsperaService,
        websocket_gateway_1.WebsocketGateway])
], AtendimentoService);
exports.AtendimentoService = AtendimentoService;
//# sourceMappingURL=atendimento.service.js.map