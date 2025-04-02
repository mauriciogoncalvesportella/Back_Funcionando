"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const local_strategy_1 = require("../auth/local.strategy");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const atendimento_module_1 = require("../atendimento/atendimento.module");
const table_service_1 = require("../table/table.service");
const table_module_1 = require("../table/table.module");
const table_entity_1 = require("../table/table.entity");
const grupoAcesso_entity_1 = require("./grupoAcesso.entity");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            table_module_1.TableModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, grupoAcesso_entity_1.GrupoAcessoEntity]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map