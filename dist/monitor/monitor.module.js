"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModule = void 0;
const common_1 = require("@nestjs/common");
const monitor_service_1 = require("./monitor.service");
const monitor_controller_1 = require("./monitor.controller");
const typeorm_1 = require("@nestjs/typeorm");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const user_entity_1 = require("../user/user.entity");
const moment = require("moment-timezone");
const acao_entity_1 = require("../ticket/acao.entity");
let MonitorModule = class MonitorModule {
};
MonitorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                atendimento_entity_1.AtendimentoEntity,
                acao_entity_1.AcaoEntity,
            ])
        ],
        providers: [
            monitor_service_1.MonitorService,
            {
                provide: 'MomentWrapper',
                useValue: moment,
            }
        ],
        controllers: [monitor_controller_1.MonitorController],
        exports: [monitor_service_1.MonitorService],
    })
], MonitorModule);
exports.MonitorModule = MonitorModule;
//# sourceMappingURL=monitor.module.js.map