"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaveModule = void 0;
const common_1 = require("@nestjs/common");
const chave_service_1 = require("./chave.service");
const typeorm_1 = require("@nestjs/typeorm");
const chave_entity_1 = require("./chave.entity");
const chave_controller_1 = require("./chave.controller");
const solicitante_entity_1 = require("./solicitante.entity");
const xc3_service_1 = require("./xc3.service");
const xc3_controller_1 = require("./xc3.controller");
const chavefone_entity_1 = require("./chavefone.entity");
const user_entity_1 = require("../user/user.entity");
const atendimento_module_1 = require("../atendimento/atendimento.module");
let ChaveModule = class ChaveModule {
};
ChaveModule = __decorate([
    (0, common_1.Module)({
        imports: [
            atendimento_module_1.AtendimentoModule,
            typeorm_1.TypeOrmModule.forFeature([chave_entity_1.ChaveEntity, solicitante_entity_1.SolicitanteEntity, chavefone_entity_1.ChaveFoneEntity, user_entity_1.UserEntity])
        ],
        providers: [chave_service_1.ChaveService, xc3_service_1.Xc3Service],
        controllers: [chave_controller_1.ChaveController, xc3_controller_1.Xc3Controller],
    })
], ChaveModule);
exports.ChaveModule = ChaveModule;
//# sourceMappingURL=chave.module.js.map