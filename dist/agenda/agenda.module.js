"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const evento_entity_1 = require("./evento.entity");
const agenda_service_1 = require("./agenda.service");
const agenda_controller_1 = require("./agenda.controller");
const tipoagendamento_entity_1 = require("./tipoagendamento.entity");
const tpagendamento_service_1 = require("./tpagendamento.service");
const evento_subscriber_1 = require("./evento.subscriber");
let AgendaModule = class AgendaModule {
};
AgendaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([evento_entity_1.EventoEntity, tipoagendamento_entity_1.TipoAgendamentoEntity]),
        ],
        providers: [agenda_service_1.AgendaService, tpagendamento_service_1.TipoAgendamentoService, evento_subscriber_1.EventoSubscriber],
        controllers: [agenda_controller_1.AgendaController],
        exports: [tpagendamento_service_1.TipoAgendamentoService],
    })
], AgendaModule);
exports.AgendaModule = AgendaModule;
//# sourceMappingURL=agenda.module.js.map