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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const table_entity_1 = require("../table/table.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
const grupoAcesso_entity_1 = require("./grupoAcesso.entity");
const servico_entity_1 = require("../ticket/servico.entity");
const acao_entity_1 = require("../ticket/acao.entity");
const evento_entity_1 = require("../agenda/evento.entity");
const chave_entity_1 = require("../chave/chave.entity");
let UserEntity = class UserEntity {
    constructor(cd) {
        this.cd = cd;
    }
    async hashSenha() {
        this.idsenha = await bcrypt.hash(this.idsenha, 10);
        return this.idsenha;
    }
    async comparePassword(attempt) {
        return await bcrypt.compare(attempt, this.idsenha);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "idRamal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeorm_1.Timestamp)
], UserEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "idlogin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "idnome", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "idemail", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "jsturnos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "idsenha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "idcolor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => chave_entity_1.ChaveEntity, chave => chave.cdresponsavel),
    __metadata("design:type", Array)
], UserEntity.prototype, "chaves", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => grupoAcesso_entity_1.GrupoAcessoEntity, grupoAcesso => grupoAcesso.cd),
    __metadata("design:type", Number)
], UserEntity.prototype, "grupoacesso", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => servico_entity_1.ServicoEntity, servico => servico.cduser),
    __metadata("design:type", Array)
], UserEntity.prototype, "servicos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => atendimento_entity_1.AtendimentoEntity, atendimento => atendimento.cduser),
    __metadata("design:type", Array)
], UserEntity.prototype, "atendimentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => table_entity_1.TableEntity, table => table.cduser),
    __metadata("design:type", Array)
], UserEntity.prototype, "tables", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => acao_entity_1.AcaoEntity, table => table.cduser),
    __metadata("design:type", Array)
], UserEntity.prototype, "acoes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => ticket_entity_1.TicketEntity, entity => entity.users),
    __metadata("design:type", Array)
], UserEntity.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => evento_entity_1.EventoEntity, entity => entity.users),
    __metadata("design:type", Array)
], UserEntity.prototype, "eventos", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashSenha", null);
UserEntity = __decorate([
    (0, typeorm_1.Unique)(['idemail']),
    (0, typeorm_1.Entity)('tuser'),
    __metadata("design:paramtypes", [Number])
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map