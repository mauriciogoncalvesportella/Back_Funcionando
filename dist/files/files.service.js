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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const ticket_dto_1 = require("../ticket/ticket.dto");
const ticket_service_1 = require("../ticket/ticket.service");
const date_fns_tz_1 = require("date-fns-tz");
const typeorm_1 = require("@nestjs/typeorm");
const chave_entity_1 = require("../chave/chave.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
let FilesService = class FilesService {
    constructor(ticketService, chaveRepository, userRepository) {
        this.ticketService = ticketService;
        this.chaveRepository = chaveRepository;
        this.userRepository = userRepository;
    }
    downloadTicketTableCSV(res, user, filter) {
        const transform = (arr, textKey) => {
            return arr.reduce((prev, curr) => {
                prev[curr.cd] = curr[textKey];
                return prev;
            }, {});
        };
        return new Promise(async (resolve, reject) => {
            const ticketStream = await this.ticketService.allFilterQueryBuilder(filter, user).stream();
            let check = {};
            res.write('ID;Dt. Criação;Tipo;Iniciado Por;Cliente;Motivo;Assunto;Urgência;Situacao;Tempo minutos\n');
            let { situacao, motivo, urgencia } = await this.ticketService.allMeta();
            let users = await this.userRepository.find();
            let chaves = await this.chaveRepository.find();
            users = transform(users, 'idlogin');
            situacao = transform(situacao, 'nmsituacao');
            motivo = transform(motivo, 'nmmotivo');
            urgencia = transform(urgencia, 'nmurgencia');
            chaves = transform(chaves, 'idfantasia');
            let totalTime = 0;
            ticketStream.on('data', async (data) => {
                var _a;
                const data2 = data;
                if (!check[data2.ticket_cd]) {
                    let entity = new atendimento_entity_1.AtendimentoEntity();
                    entity.jslista = data2.atendimento_jslista;
                    totalTime += entity.tempoTotal;
                    const dtCriacao = (0, date_fns_tz_1.utcToZonedTime)(data2.ticket_dtcriacao, 'America/Sao_Paulo');
                    let line = `${data2.ticket_cd};`;
                    line += `${(0, date_fns_tz_1.format)(dtCriacao, 'HH:MM dd/MM/yyyy', { timeZone: 'America/Sao_Paulo' })};`;
                    line += `${data2.ticket_fgticket};`;
                    line += `${users[data2.atendimento_cduserCd]};`;
                    line += `${chaves[data2.atendimento_cdchaveCd]};`;
                    line += `${motivo[data2.atendimento_cdmotivoCd]};`;
                    line += `${data2.ticket_nmtitulo};`;
                    line += `${(_a = urgencia[data2.ticket_cdurgenciaCd]) !== null && _a !== void 0 ? _a : ''};`;
                    line += `${situacao[data2.ticket_cdsituacaoCd]};`,
                        line += `${(entity.tempoTotal / 6e4).toFixed(1)}\n`;
                    res.write(line);
                    check[data2.ticket_cd] = true;
                }
            });
            ticketStream.on('close', () => {
                res.write(`TOTAL;-;-;-;-;-;-;-;-;${(totalTime / 3600000).toFixed(1)} horas`);
                res.end();
                resolve();
            });
        });
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(chave_entity_1.ChaveEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [ticket_service_1.TicketService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map