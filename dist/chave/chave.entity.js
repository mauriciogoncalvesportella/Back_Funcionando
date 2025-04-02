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
exports.ChaveEntity = void 0;
const typeorm_1 = require("typeorm");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const solicitante_entity_1 = require("./solicitante.entity");
const chavefone_entity_1 = require("./chavefone.entity");
const user_entity_1 = require("../user/user.entity");
let ChaveEntity = class ChaveEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeorm_1.Timestamp)
], ChaveEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "cdcliente", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], ChaveEntity.prototype, "idfantasia", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], ChaveEntity.prototype, "nmrazao", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 18 }),
    __metadata("design:type", String)
], ChaveEntity.prototype, "idcnpj", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "cdsistema", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "nrcontrole", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "nrempresas", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "nrusuarios", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ChaveEntity.prototype, "dtvalidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ChaveEntity.prototype, "dtexpedicao", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 15 }),
    __metadata("design:type", String)
], ChaveEntity.prototype, "idversaoexe", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 15 }),
    __metadata("design:type", String)
], ChaveEntity.prototype, "idversaodb", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ChaveEntity.prototype, "dschave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ChaveEntity.prototype, "dtatualizacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd, { nullable: true }),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "cdresponsavel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => atendimento_entity_1.AtendimentoEntity, atendimento => atendimento.cdchave),
    __metadata("design:type", Array)
], ChaveEntity.prototype, "atendimentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => solicitante_entity_1.SolicitanteEntity, solicitante => solicitante.cdchave),
    __metadata("design:type", Array)
], ChaveEntity.prototype, "solicitantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => chavefone_entity_1.ChaveFoneEntity, chaveFone => chaveFone.cdchave),
    __metadata("design:type", Array)
], ChaveEntity.prototype, "chaveFones", void 0);
__decorate([
    (0, typeorm_1.RelationId)((chave) => chave.cdresponsavel),
    __metadata("design:type", Number)
], ChaveEntity.prototype, "_cdresponsavel", void 0);
ChaveEntity = __decorate([
    (0, typeorm_1.Entity)('tchave'),
    (0, typeorm_1.Unique)(['cdcliente', 'idcnpj', 'cdsistema'])
], ChaveEntity);
exports.ChaveEntity = ChaveEntity;
//# sourceMappingURL=chave.entity.js.map