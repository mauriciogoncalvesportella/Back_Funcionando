"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilaEsperaModule = void 0;
const common_1 = require("@nestjs/common");
const fila_espera_service_1 = require("./fila-espera.service");
const fila_espera_controller_1 = require("./fila-espera.controller");
const typeorm_1 = require("@nestjs/typeorm");
const fila_espera_entity_1 = require("./fila-espera.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const fila_espera_gateway_1 = require("./fila-espera.gateway");
const auth_module_1 = require("../auth/auth.module");
const chave_entity_1 = require("../chave/chave.entity");
const app_module_1 = require("../app.module");
let FilaEsperaModule = class FilaEsperaModule {
};
FilaEsperaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => app_module_1.AppModule),
            typeorm_1.TypeOrmModule.forFeature([
                fila_espera_entity_1.FilaEsperaEntity,
                solicitante_entity_1.SolicitanteEntity,
                chave_entity_1.ChaveEntity,
            ]),
        ],
        providers: [fila_espera_service_1.FilaEsperaService, fila_espera_gateway_1.FilaEsperaGateway],
        controllers: [fila_espera_controller_1.FilaEsperaController],
        exports: [fila_espera_gateway_1.FilaEsperaGateway, fila_espera_service_1.FilaEsperaService],
    })
], FilaEsperaModule);
exports.FilaEsperaModule = FilaEsperaModule;
//# sourceMappingURL=fila-espera.module.js.map