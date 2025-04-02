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
exports.AcaoEntity = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../user/user.entity");
const servico_entity_1 = require("./servico.entity");
let AcaoEntity = class AcaoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => ticket_entity_1.TicketEntity, ticket => ticket.cd, { onDelete: 'CASCADE' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "cdticket", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AcaoEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => servico_entity_1.ServicoEntity, servico => servico.cd, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "cdservico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "cduser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "fgstatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AcaoEntity.prototype, "mmdesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], AcaoEntity.prototype, "nmassunto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, default: [] }),
    __metadata("design:type", Object)
], AcaoEntity.prototype, "jsanexos", void 0);
__decorate([
    (0, typeorm_1.RelationId)((acao) => acao.cduser),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "_cduser", void 0);
__decorate([
    (0, typeorm_1.RelationId)((acao) => acao.cdservico),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "_cdservico", void 0);
__decorate([
    (0, typeorm_1.RelationId)((acao) => acao.cdticket),
    __metadata("design:type", Number)
], AcaoEntity.prototype, "_cdticket", void 0);
AcaoEntity = __decorate([
    (0, typeorm_1.Entity)('tacao')
], AcaoEntity);
exports.AcaoEntity = AcaoEntity;
//# sourceMappingURL=acao.entity.js.map