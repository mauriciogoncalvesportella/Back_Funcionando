"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtendimentoModule = void 0;
const common_1 = require("@nestjs/common");
const atendimento_controller_1 = require("./atendimento.controller");
const atendimento_service_1 = require("./atendimento.service");
const typeorm_1 = require("@nestjs/typeorm");
const atendimento_entity_1 = require("./atendimento.entity");
const chave_entity_1 = require("../chave/chave.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
const origem_entity_1 = require("./origem.entity");
const origem_service_1 = require("./origem.service");
const motivo_entity_1 = require("./motivo.entity");
const motivo_service_1 = require("./motivo.service");
const fila_espera_entity_1 = require("../fila-espera/fila-espera.entity");
const fila_espera_module_1 = require("../fila-espera/fila-espera.module");
const monitor_module_1 = require("../monitor/monitor.module");
const atendimento_subscriber_1 = require("./atendimento.subscriber");
let AtendimentoModule = class AtendimentoModule {
};
AtendimentoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            monitor_module_1.MonitorModule,
            fila_espera_module_1.FilaEsperaModule,
            typeorm_1.TypeOrmModule.forFeature([
                fila_espera_entity_1.FilaEsperaEntity,
                atendimento_entity_1.AtendimentoEntity,
                origem_entity_1.OrigemEntity,
                chave_entity_1.ChaveEntity,
                ticket_entity_1.TicketEntity,
                motivo_entity_1.MotivoEntity,
            ]),
        ],
        controllers: [atendimento_controller_1.AtendimentoController],
        providers: [atendimento_service_1.AtendimentoService, origem_service_1.OrigemService, motivo_service_1.MotivoService, atendimento_subscriber_1.AtendimentoSubscriber],
        exports: [atendimento_service_1.AtendimentoService, origem_service_1.OrigemService, motivo_service_1.MotivoService],
    })
], AtendimentoModule);
exports.AtendimentoModule = AtendimentoModule;
//# sourceMappingURL=atendimento.module.js.map