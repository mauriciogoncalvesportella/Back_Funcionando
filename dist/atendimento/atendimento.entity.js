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
exports.AtendimentoEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const chave_entity_1 = require("../chave/chave.entity");
const origem_entity_1 = require("./origem.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
const motivo_entity_1 = require("./motivo.entity");
const fila_espera_entity_1 = require("../fila-espera/fila-espera.entity");
const shortid = require('shortid');
class Atendimento {
}
let AtendimentoEntity = class AtendimentoEntity {
    get tempoTotal() {
        return this.jslista.reduce((prev, current) => {
            const d1 = new Date(current.dtinicio);
            const d2 = new Date(current.dtfim);
            return prev + (d2.getTime() - d1.getTime());
        }, 0);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], AtendimentoEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], AtendimentoEntity.prototype, "jslista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], AtendimentoEntity.prototype, "fgativo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => ticket_entity_1.TicketEntity, ticket => ticket.cdatendimento, { onDelete: 'CASCADE' }),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cdticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd, { onDelete: 'CASCADE' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cduser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => motivo_entity_1.MotivoEntity, motivo => motivo.cd),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cdmotivo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => origem_entity_1.OrigemEntity, origem => origem.cd),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cdorigem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => chave_entity_1.ChaveEntity, chave => chave.cd),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cdchave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], AtendimentoEntity.prototype, "dtinicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], AtendimentoEntity.prototype, "dtfim", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => fila_espera_entity_1.FilaEsperaEntity, filaEspera => filaEspera.cd, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "cdfila", void 0);
__decorate([
    (0, typeorm_1.RelationId)((atendimento) => atendimento.cdorigem),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "_cdorigem", void 0);
__decorate([
    (0, typeorm_1.RelationId)((atendimento) => atendimento.cdchave),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "_cdchave", void 0);
__decorate([
    (0, typeorm_1.RelationId)((atendimento) => atendimento.cdmotivo),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "_cdmotivo", void 0);
__decorate([
    (0, typeorm_1.RelationId)((atendimento) => atendimento.cduser),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "_cduser", void 0);
__decorate([
    (0, typeorm_1.RelationId)((atendimento) => atendimento.cdticket),
    __metadata("design:type", Number)
], AtendimentoEntity.prototype, "_cdticket", void 0);
AtendimentoEntity = __decorate([
    (0, typeorm_1.Entity)('tatendimento')
], AtendimentoEntity);
exports.AtendimentoEntity = AtendimentoEntity;
//# sourceMappingURL=atendimento.entity.js.map