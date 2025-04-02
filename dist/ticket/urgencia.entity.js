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
exports.UrgenciaEntity = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const chave_entity_1 = require("../chave/chave.entity");
const interfaces_1 = require("../shared/interfaces");
const shortid = require('shortid');
let UrgenciaEntity = class UrgenciaEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UrgenciaEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => ticket_entity_1.TicketEntity, ticket => ticket.cdurgencia),
    __metadata("design:type", Array)
], UrgenciaEntity.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UrgenciaEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UrgenciaEntity.prototype, "nmurgencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UrgenciaEntity.prototype, "idcolor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UrgenciaEntity.prototype, "nprevisao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UrgenciaEntity.prototype, "nordem", void 0);
UrgenciaEntity = __decorate([
    (0, typeorm_1.Entity)('turgencia')
], UrgenciaEntity);
exports.UrgenciaEntity = UrgenciaEntity;
//# sourceMappingURL=urgencia.entity.js.map