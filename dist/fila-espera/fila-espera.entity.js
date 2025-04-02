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
exports.FilaEsperaEntity = void 0;
const chave_entity_1 = require("../chave/chave.entity");
const typeorm_1 = require("typeorm");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const user_entity_1 = require("../user/user.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
let FilaEsperaEntity = class FilaEsperaEntity extends typeorm_1.BaseEntity {
    async saveAndReload() {
        await this.save();
        await this.reload();
        return this;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => chave_entity_1.ChaveEntity, chave => chave.cd),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "cdchave", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], FilaEsperaEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], FilaEsperaEntity.prototype, "dtfinalizado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => solicitante_entity_1.SolicitanteEntity, solicitante => solicitante.cd),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "cdsolicitante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd, { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "cduser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FilaEsperaEntity.prototype, "mmobservacao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => atendimento_entity_1.AtendimentoEntity, atendimento => atendimento.cd, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "cdatendimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "fgstatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], FilaEsperaEntity.prototype, "fgurgente", void 0);
__decorate([
    (0, typeorm_1.RelationId)((entity) => entity.cduser),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "_cduser", void 0);
__decorate([
    (0, typeorm_1.RelationId)((entity) => entity.cdchave),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "_cdchave", void 0);
__decorate([
    (0, typeorm_1.RelationId)((entity) => entity.cdsolicitante),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "_cdsolicitante", void 0);
__decorate([
    (0, typeorm_1.RelationId)((entity) => entity.cdatendimento),
    __metadata("design:type", Number)
], FilaEsperaEntity.prototype, "_cdatendimento", void 0);
FilaEsperaEntity = __decorate([
    (0, typeorm_1.Entity)('tfilaespera')
], FilaEsperaEntity);
exports.FilaEsperaEntity = FilaEsperaEntity;
//# sourceMappingURL=fila-espera.entity.js.map