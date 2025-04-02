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
exports.GrupoAcessoEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let GrupoAcessoEntity = class GrupoAcessoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GrupoAcessoEntity.prototype, "cd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], GrupoAcessoEntity.prototype, "dtcriacao", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], GrupoAcessoEntity.prototype, "idnome", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'mdi-account',
    }),
    __metadata("design:type", String)
], GrupoAcessoEntity.prototype, "idicon", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], GrupoAcessoEntity.prototype, "jsroles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => user_entity_1.UserEntity, user => user.grupoacesso),
    __metadata("design:type", Array)
], GrupoAcessoEntity.prototype, "users", void 0);
GrupoAcessoEntity = __decorate([
    (0, typeorm_1.Unique)(['idnome']),
    (0, typeorm_1.Entity)('tgrupoacesso')
], GrupoAcessoEntity);
exports.GrupoAcessoEntity = GrupoAcessoEntity;
//# sourceMappingURL=grupoAcesso.entity.js.map