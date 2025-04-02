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
exports.EventoEntity = exports.Recorrencia = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const tipoagendamento_entity_1 = require("./tipoagendamento.entity");
const chave_entity_1 = require("../chave/chave.entity");
class Recorrencia {
    constructor(id, list, inicio, fim) {
        this.id = id;
        this.list = list;
        this.inicio = inicio;
        this.fim = fim;
    }
}
exports.Recorrencia = Recorrencia;
let EventoEntity = class EventoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventoEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], EventoEntity.prototype, "nmtitulo", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], EventoEntity.prototype, "nmlocal", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], EventoEntity.prototype, "mmdesc", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], EventoEntity.prototype, "fgcadeado", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], EventoEntity.prototype, "fgcobrarvisita", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], EventoEntity.prototype, "fgconfirmado", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], EventoEntity.prototype, "fgdiatodo", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], EventoEntity.prototype, "fgrecorrente", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], EventoEntity.prototype, "dtinicio", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], EventoEntity.prototype, "dtfim", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], EventoEntity.prototype, "dtrealizadoinicio", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], EventoEntity.prototype, "dtrealizadofim", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], EventoEntity.prototype, "indexdtinicio", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], EventoEntity.prototype, "indexdtfim", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], EventoEntity.prototype, "nmcontato", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], EventoEntity.prototype, "idtelefone", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Recorrencia)
], EventoEntity.prototype, "jsrecorrencia", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], EventoEntity.prototype, "cdeventorecorrente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => tipoagendamento_entity_1.TipoAgendamentoEntity, tipoAgendamento => tipoAgendamento.cd),
    __metadata("design:type", Number)
], EventoEntity.prototype, "cdtipoagendamento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => chave_entity_1.ChaveEntity, chave => chave.cd, { nullable: true }),
    __metadata("design:type", Number)
], EventoEntity.prototype, "cdchave", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.UserEntity, user => user.cd),
    __metadata("design:type", Number)
], EventoEntity.prototype, "cdresponsavel", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => user_entity_1.UserEntity, entity => entity.eventos),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], EventoEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.RelationId)((evento) => evento.cdtipoagendamento),
    __metadata("design:type", Number)
], EventoEntity.prototype, "_cdtipoagendamento", void 0);
__decorate([
    (0, typeorm_1.RelationId)((evento) => evento.cdchave),
    __metadata("design:type", Number)
], EventoEntity.prototype, "_cdchave", void 0);
__decorate([
    (0, typeorm_1.RelationId)((evento) => evento.users),
    __metadata("design:type", Array)
], EventoEntity.prototype, "_cdusers", void 0);
__decorate([
    (0, typeorm_1.RelationId)((evento) => evento.cdresponsavel),
    __metadata("design:type", Number)
], EventoEntity.prototype, "_cdresponsavel", void 0);
EventoEntity = __decorate([
    (0, typeorm_1.Entity)('tevento')
], EventoEntity);
exports.EventoEntity = EventoEntity;
//# sourceMappingURL=evento.entity.js.map