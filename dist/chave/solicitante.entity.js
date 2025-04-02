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
exports.SolicitanteEntity = void 0;
const typeorm_1 = require("typeorm");
const chave_entity_1 = require("./chave.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
let SolicitanteEntity = class SolicitanteEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SolicitanteEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], SolicitanteEntity.prototype, "idsolicitante", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], SolicitanteEntity.prototype, "idgpacesso", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => ticket_entity_1.TicketEntity, ticket => ticket.cdsolicitante),
    __metadata("design:type", Array)
], SolicitanteEntity.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => chave_entity_1.ChaveEntity, chave => chave.cd),
    __metadata("design:type", Number)
], SolicitanteEntity.prototype, "cdchave", void 0);
SolicitanteEntity = __decorate([
    (0, typeorm_1.Entity)('tsolicitante'),
    (0, typeorm_1.Unique)(['idsolicitante', 'cdchave'])
], SolicitanteEntity);
exports.SolicitanteEntity = SolicitanteEntity;
//# sourceMappingURL=solicitante.entity.js.map