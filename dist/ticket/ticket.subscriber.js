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
exports.TicketSubscriber = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const situacao_entity_1 = require("./situacao.entity");
const ticket_service_1 = require("./ticket.service");
let TicketSubscriber = class TicketSubscriber {
    constructor(connection, userRepository, situacaoRepository, ticketService) {
        this.connection = connection;
        this.userRepository = userRepository;
        this.situacaoRepository = situacaoRepository;
        this.ticketService = ticketService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return ticket_entity_1.TicketEntity;
    }
    async beforeInsert(ticket) {
        const userTicketLength = {};
        const cdFinalizado = (await this.situacaoRepository.findOneOrFail({ nmsituacao: 'Finalizado' })).cd;
        if (ticket.entity.cdsituacao !== cdFinalizado) {
            const users = ticket.entity.users.map(it => {
                userTicketLength[it.cd] = 0;
                return it.cd;
            });
            const qb = await this.userRepository.createQueryBuilder('user')
                .andWhere('user.cd in (:...users)', { users })
                .leftJoinAndMapMany('user.tickets', 'user.tickets', 'ticket')
                .andWhere('ticket.cdsituacao = :cdsituacao', { cdsituacao: ticket.entity.cdsituacao })
                .getMany();
            for (const user of qb) {
                userTicketLength[user.cd] = user.tickets.length;
            }
            ticket.entity.jskanbanorder = userTicketLength;
        }
        if (ticket.entity.cdurgencia == null) {
            ticket.entity.dtprevisao = null;
        }
    }
    async afterInsert(event) {
        this.ticketService.removeKanbanCache(event.entity);
    }
    async afterUpdate(event) {
        this.ticketService.removeKanbanCache(event.entity);
    }
};
TicketSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(situacao_entity_1.SituacaoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.Repository,
        typeorm_1.Repository,
        ticket_service_1.TicketService])
], TicketSubscriber);
exports.TicketSubscriber = TicketSubscriber;
//# sourceMappingURL=ticket.subscriber.js.map