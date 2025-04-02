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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketEntity = void 0;
const typeorm_1 = require("typeorm");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const urgencia_entity_1 = require("./urgencia.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const situacao_entity_1 = require("./situacao.entity");
const acao_entity_1 = require("./acao.entity");
const user_entity_1 = require("../user/user.entity");
const shortid = require('shortid');
let TicketEntity = class TicketEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], TicketEntity.prototype, "fgarquivado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], TicketEntity.prototype, "jskanbanorder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], TicketEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { nullable: true }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "fgticket", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdsistema", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "ntotal", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], TicketEntity.prototype, "nmtitulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "dtprevisao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => atendimento_entity_1.AtendimentoEntity, atendimento => atendimento.cdticket, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdatendimento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => acao_entity_1.AcaoEntity, acao => acao.cdticket, { nullable: true }),
    __metadata("design:type", Array)
], TicketEntity.prototype, "acoes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => urgencia_entity_1.UrgenciaEntity, urgencia => urgencia.cd, { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdurgencia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => solicitante_entity_1.SolicitanteEntity, solicitante => solicitante.cd, { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdsolicitante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => situacao_entity_1.SituacaoEntity, situacao => situacao.cd, { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdsituacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd, { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "cdresponsavel", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => user_entity_1.UserEntity, entity => entity.tickets, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], TicketEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.RelationId)((ticket) => ticket.cdurgencia),
    __metadata("design:type", Number)
], TicketEntity.prototype, "_cdurgencia", void 0);
__decorate([
    (0, typeorm_1.RelationId)((ticket) => ticket.cdsolicitante),
    __metadata("design:type", Number)
], TicketEntity.prototype, "_cdsolicitante", void 0);
__decorate([
    (0, typeorm_1.RelationId)((ticket) => ticket.cdsituacao),
    __metadata("design:type", Number)
], TicketEntity.prototype, "_cdsituacao", void 0);
__decorate([
    (0, typeorm_1.RelationId)((ticket) => ticket.cdresponsavel),
    __metadata("design:type", Number)
], TicketEntity.prototype, "_cdresponsavel", void 0);
__decorate([
    (0, typeorm_1.RelationId)((ticket) => ticket.users),
    __metadata("design:type", Array)
], TicketEntity.prototype, "_cdusers", void 0);
TicketEntity = __decorate([
    (0, typeorm_1.Entity)('tticket')
], TicketEntity);
exports.TicketEntity = TicketEntity;
//# sourceMappingURL=ticket.entity.js.map