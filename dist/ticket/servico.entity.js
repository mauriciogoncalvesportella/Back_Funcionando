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
exports.ServicoEntity = exports.PeriodoServico = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
class PeriodoServico {
}
exports.PeriodoServico = PeriodoServico;
let ServicoEntity = class ServicoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServicoEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(user => user_entity_1.UserEntity, user => user.cd, { nullable: true }),
    __metadata("design:type", Number)
], ServicoEntity.prototype, "cduser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], ServicoEntity.prototype, "ntotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], ServicoEntity.prototype, "jslista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ServicoEntity.prototype, "dtinicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ServicoEntity.prototype, "dtfim", void 0);
__decorate([
    (0, typeorm_1.RelationId)((servico) => servico.cduser),
    __metadata("design:type", Number)
], ServicoEntity.prototype, "_cduser", void 0);
ServicoEntity = __decorate([
    (0, typeorm_1.Entity)('tservico')
], ServicoEntity);
exports.ServicoEntity = ServicoEntity;
//# sourceMappingURL=servico.entity.js.map