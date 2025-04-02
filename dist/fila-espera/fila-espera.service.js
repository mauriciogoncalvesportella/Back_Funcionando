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
exports.FilaEsperaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fila_espera_entity_1 = require("./fila-espera.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const lodash_1 = require("lodash");
const moment = require("moment-timezone");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
let FilaEsperaService = class FilaEsperaService {
    constructor(filaEsperaRepository, solicitanteRepository, websocketGateway, connection) {
        this.filaEsperaRepository = filaEsperaRepository;
        this.solicitanteRepository = solicitanteRepository;
        this.websocketGateway = websocketGateway;
        this.connection = connection;
    }
    async add(data, user) {
        let entity = this.filaEsperaRepository.create(data);
        const ret = await entity.saveAndReload();
        ret.cdsolicitante = await this.solicitanteRepository.findOneOrFail(ret.cdsolicitante);
        this.websocketGateway.notifyRoom('FilaEspera', 'add', ret, user.cd);
        return ret;
    }
    async delete(cd, user) {
        await this.filaEsperaRepository.delete(cd);
        this.websocketGateway.notifyRoom('FilaEspera', 'remove', cd, user.cd);
    }
    async allOnline() {
        return await this.filaEsperaRepository.find({
            where: {
                fgstatus: 0,
            },
            order: {
                fgurgente: 'DESC',
                cd: 'ASC',
            },
            relations: ['cdsolicitante'],
        });
    }
    async all(allDTO) {
        let dtinicio;
        let dtfim;
        if (allDTO.date) {
            dtinicio = moment.tz(`${allDTO.date} 00:00`, 'America/Sao_Paulo').utc().format();
            dtfim = moment.tz(`${allDTO.date} 23:59`, 'America/Sao_Paulo').utc().format();
        }
        return await this.filaEsperaRepository.find({
            skip: allDTO.skip,
            take: allDTO.take,
            relations: ['cdsolicitante', 'cdatendimento'],
            where: (0, lodash_1.omitBy)({
                cdchave: allDTO.cdchave,
                cdsolicitante: allDTO.cdsolicitante,
                dtcriacao: allDTO.date ? (0, typeorm_2.Between)(dtinicio, dtfim) : null,
            }, lodash_1.isNil),
            order: {
                cd: 'DESC',
            },
        });
    }
    async close(cd, cdatendimento, user, manager = this.connection.manager) {
        const entity = await manager.findOneOrFail(fila_espera_entity_1.FilaEsperaEntity, cd);
        entity.fgstatus = 1;
        entity.dtfinalizado = new Date();
        entity.cdatendimento = cdatendimento;
        await manager.save(entity);
        this.websocketGateway.notifyRoom('FilaEspera', 'remove', cd, user.cd);
    }
};
FilaEsperaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fila_espera_entity_1.FilaEsperaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(solicitante_entity_1.SolicitanteEntity)),
    __param(3, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        websocket_gateway_1.WebsocketGateway,
        typeorm_2.Connection])
], FilaEsperaService);
exports.FilaEsperaService = FilaEsperaService;
//# sourceMappingURL=fila-espera.service.js.map