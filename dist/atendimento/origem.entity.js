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
exports.OrigemEntity = void 0;
const typeorm_1 = require("typeorm");
const atendimento_entity_1 = require("./atendimento.entity");
const interfaces_1 = require("../shared/interfaces");
let OrigemEntity = class OrigemEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrigemEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => atendimento_entity_1.AtendimentoEntity, atendimento => atendimento.cdorigem),
    __metadata("design:type", Array)
], OrigemEntity.prototype, "atendimentos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrigemEntity.prototype, "nmorigem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrigemEntity.prototype, "idicon", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], OrigemEntity.prototype, "nordem", void 0);
OrigemEntity = __decorate([
    (0, typeorm_1.Entity)('torigem')
], OrigemEntity);
exports.OrigemEntity = OrigemEntity;
//# sourceMappingURL=origem.entity.js.map