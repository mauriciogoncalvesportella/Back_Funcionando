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
exports.AcaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const acao_entity_1 = require("./acao.entity");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const urgencia_entity_1 = require("./urgencia.entity");
const user_entity_1 = require("../user/user.entity");
const ticket_dto_1 = require("./ticket.dto");
const ticket_service_1 = require("./ticket.service");
const servico_entity_1 = require("./servico.entity");
const servico_service_1 = require("./servico.service");
const atendimento_service_1 = require("../atendimento/atendimento.service");
let AcaoService = class AcaoService {
    constructor(atendimentoService, servicoService, ticketService, acaoRepository, servicoRepository, solicitanteRepository, urgenciaRepository, userRepository, ticketRepository, connection) {
        this.atendimentoService = atendimentoService;
        this.servicoService = servicoService;
        this.ticketService = ticketService;
        this.acaoRepository = acaoRepository;
        this.servicoRepository = servicoRepository;
        this.solicitanteRepository = solicitanteRepository;
        this.urgenciaRepository = urgenciaRepository;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.connection = connection;
    }
    async getAcao(cdacao, user, currManager = null) {
        let manager = currManager || this.connection.manager;
        return await manager.findOneOrFail(acao_entity_1.AcaoEntity, cdacao, { relations: ['cdservico'] });
    }
    async allAcao(cdticket, user) {
        if (!user.roles.find(it => it === 'tickets.others')) {
            const ticket = await this.ticketRepository.findOne({
                where: { cd: cdticket },
                relations: ['users'],
            });
            if (!ticket.users.find(it => it.cd === user.cd)) {
                throw new common_1.ForbiddenException;
            }
        }
        return await this.acaoRepository.find({
            where: {
                cdticket: cdticket,
            },
            relations: ['cdservico'],
            order: {
                cd: 'DESC',
            },
        });
    }
    async startServico(cdacao, user, customManager = null) {
        let manager = customManager || this.connection.manager;
        const acao = await manager.findOneOrFail(acao_entity_1.AcaoEntity, cdacao);
        if (!acao._cdservico) {
            throw new common_1.BadRequestException;
        }
        if (acao._cduser !== user.cd) {
            throw new common_1.ForbiddenException;
        }
        await this.servicoService.start(user, acao._cdservico, manager);
        await this.atendimentoService.stopStart({
            cdatendimento: -1,
        }, user);
    }
    async stopServico(user, manager = null) {
        await this.servicoService.stopAll(user, manager);
    }
    async closeServico(user, acao, manager = this.connection.manager) {
        const ntotal = await this.servicoService.close(user, acao.cdservico, manager);
        if (ntotal > 0) {
        }
    }
    async delete(cdacao, user) {
        const acao = await this.acaoRepository.findOneOrFail(cdacao);
        await this.connection.transaction(async (manager) => {
            const cdservico = acao._cdservico;
            await manager.delete(acao_entity_1.AcaoEntity, cdacao);
            if (cdservico) {
                await manager.delete(servico_entity_1.ServicoEntity, cdservico);
            }
        });
    }
    async addAcaoAfterTicketUpdate(oldTicket, newTicket, user, manager = null) {
        const oldUsersArray = oldTicket.users.map(curr => curr.cd);
        const newUsersArray = newTicket.users.map(curr => curr.cd);
        const removedUsers = oldTicket.users.filter(currUser => !newUsersArray.includes(currUser.cd));
        const addedUsers = newTicket.users.filter(currUser => !oldUsersArray.includes(currUser.cd));
        let nmAcao = [];
        let mmAcao = '';
        if (oldTicket.fgticket != newTicket.fgticket) {
            nmAcao.push(`Tipo Ticket`);
            const fgticket = ['Público', 'Interno'];
            mmAcao += `<p><strong>Tipo Ticket</strong><br>${fgticket[oldTicket.fgticket]} <strong>-></strong> ${fgticket[newTicket.fgticket]}`;
        }
        if (oldTicket.cdsolicitante.cd != newTicket.cdsolicitante) {
            nmAcao.push('Solicitante');
            const newSolicitante = await this.solicitanteRepository.findOneOrFail(newTicket.cdsolicitante);
            mmAcao += `<p><strong>Solicitante</strong><br>${oldTicket.cdsolicitante.idsolicitante} <strong>-></strong> ${newSolicitante.idsolicitante}</p>`;
        }
        if (oldTicket.cdsistema != newTicket.cdsistema) {
            nmAcao.push('Sistema');
            const cdsistema = ['Commerce', 'Coletas', 'Tablet'];
            mmAcao += `<p><strong>Sistema</strong><br>${cdsistema[oldTicket.cdsistema]} <strong>-></strong> ${cdsistema[newTicket.cdsistema]}`;
        }
        if (oldTicket.cdurgencia.cd != newTicket.cdurgencia) {
            nmAcao.push('Urgência');
            const newUrgencia = await this.urgenciaRepository.findOneOrFail(newTicket.cdurgencia);
            mmAcao += `<p><strong>Urgência</strong><br>${oldTicket.cdurgencia.nmurgencia} <strong>-></strong> ${newUrgencia.nmurgencia}`;
        }
        if (removedUsers.length > 0 || addedUsers.length > 0) {
            nmAcao.push('Pessoas');
            mmAcao += `<p><strong>Pessoas Vinculadas</strong><br>`;
            for (const user of addedUsers) {
                const userEntity = await this.userRepository.findOneOrFail(user);
                mmAcao += `<strong>+</strong> ${userEntity.idnome}<br>`;
            }
            for (const user of removedUsers) {
                mmAcao += `<strong>-</strong> ${user.idnome}<br>`;
            }
            mmAcao += '</p>';
        }
        if (mmAcao) {
            const addAcaoDTO = new ticket_dto_1.AcaoAddDTO;
            addAcaoDTO.cduser = user.cd;
            addAcaoDTO.cdticket = newTicket.cd;
            addAcaoDTO.nmassunto = `Alteração Ticket (${nmAcao.join(', ')})`;
            addAcaoDTO.mmdesc = mmAcao;
            addAcaoDTO.fgstatus = 1;
            await this.addAcao(addAcaoDTO, user, manager, false);
        }
    }
    async addAcao(data, user, manager = null, validateCdticket) {
        if (validateCdticket) {
            let ticket = await this.ticketRepository.findOneOrFail({
                where: { cd: data.cdticket },
                relations: ['users'],
            });
            if (!user.roles.includes('tickets.others.rewrite') && !ticket.users.find(it => it.cd === user.cd)) {
                throw new common_1.ForbiddenException;
            }
            if (ticket._cdsituacao === 4 && data.cdsituacao !== ticket._cdsituacao) {
                await this.connection.transaction(async (currManager) => {
                    if (ticket._cdurgencia == null) {
                        await currManager
                            .createQueryBuilder()
                            .update('tticket')
                            .set({
                            cdurgencia: '1'
                        })
                            .where("cd = :cd", { cd: data.cdticket })
                            .execute();
                    }
                    if (ticket.dtprevisao == null) {
                        await currManager
                            .createQueryBuilder()
                            .update('tticket')
                            .set({
                            dtprevisao: new Date().toISOString()
                        })
                            .where("cd = :cd", { cd: data.cdticket })
                            .execute();
                    }
                    const jsKanban = {};
                    for (const us of ticket._cdusers) {
                        jsKanban[us.toString()] = 999999;
                    }
                    await currManager
                        .createQueryBuilder()
                        .update('tticket')
                        .set({
                        jskanbanorder: jsKanban
                    })
                        .where("cd = :cd", { cd: data.cdticket })
                        .execute();
                });
            }
        }
        let acao = this.acaoRepository.create(data);
        if (manager) {
            acao = await manager.save(acao);
        }
        else {
            await this.connection.transaction(async (currManager) => {
                if (acao.fgstatus === 0) {
                    let servico = new servico_entity_1.ServicoEntity();
                    servico.cduser = acao.cduser;
                    servico = await currManager.save(servico);
                    acao.cdservico = servico.cd;
                    await this.servicoService.start(user, servico.cd, currManager);
                    await this.atendimentoService.stopStart({ cdatendimento: -1 }, user, currManager);
                }
                else if (acao.fgstatus === 1) {
                    await this.closeServico(user, acao, currManager);
                }
                acao = await currManager.save(acao);
                if (data.cdsituacao) {
                    await this.ticketService.changeSituacao({ cd: data.cdticket, cdsituacao: data.cdsituacao }, user, currManager);
                }
                if (data.cdresponsavel) {
                    await this.ticketService.changeCdresponsavel(data.cdticket, data.cdresponsavel, user, currManager);
                }
            });
        }
        return {
            cd: acao.cd,
        };
    }
};
AcaoService = __decorate([
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => ticket_service_1.TicketService))),
    __param(3, (0, typeorm_1.InjectRepository)(acao_entity_1.AcaoEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(servico_entity_1.ServicoEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(solicitante_entity_1.SolicitanteEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(urgencia_entity_1.UrgenciaEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(ticket_entity_1.TicketEntity)),
    __param(9, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [atendimento_service_1.AtendimentoService,
        servico_service_1.ServicoService,
        ticket_service_1.TicketService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], AcaoService);
exports.AcaoService = AcaoService;
//# sourceMappingURL=acao.service.js.map