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
exports.ChaveFoneEntity = void 0;
const typeorm_1 = require("typeorm");
const chave_entity_1 = require("./chave.entity");
let ChaveFoneEntity = class ChaveFoneEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChaveFoneEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 12 }),
    __metadata("design:type", String)
], ChaveFoneEntity.prototype, "fone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], ChaveFoneEntity.prototype, "idnome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => chave_entity_1.ChaveEntity, chave => chave.cd, { nullable: true }),
    __metadata("design:type", Number)
], ChaveFoneEntity.prototype, "cdchave", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ChaveFoneEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.RelationId)((entity) => entity.cdchave),
    __metadata("design:type", Number)
], ChaveFoneEntity.prototype, "_cdchave", void 0);
ChaveFoneEntity = __decorate([
    (0, typeorm_1.Entity)('tchavefone'),
    (0, typeorm_1.Unique)(['fone'])
], ChaveFoneEntity);
exports.ChaveFoneEntity = ChaveFoneEntity;
//# sourceMappingURL=chavefone.entity.js.map