"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
const ticket_entity_1 = require("./ticket.entity");
const urgencia_entity_1 = require("./urgencia.entity");
const acao_entity_1 = require("./acao.entity");
const ticket_service_1 = require("./ticket.service");
const ticket_controller_1 = require("./ticket.controller");
const situacao_entity_1 = require("./situacao.entity");
const solicitante_entity_1 = require("../chave/solicitante.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const user_entity_1 = require("../user/user.entity");
const atendimento_module_1 = require("../atendimento/atendimento.module");
const ticket_subscriber_1 = require("./ticket.subscriber");
const motivo_entity_1 = require("../atendimento/motivo.entity");
const acao_service_1 = require("./acao.service");
const acao_subscriber_1 = require("./acao.subscriber");
const servico_entity_1 = require("./servico.entity");
const servico_subscriber_1 = require("./servico.subscriber");
const servico_service_1 = require("./servico.service");
const situacao_service_1 = require("./situacao.service");
const urgencia_service_1 = require("./urgencia.service");
const chave_entity_1 = require("../chave/chave.entity");
const origem_entity_1 = require("../atendimento/origem.entity");
const monitor_module_1 = require("../monitor/monitor.module");
const uuid_1 = require("uuid");
const path = require("path");
const fs = require('fs');
let TicketModule = class TicketModule {
};
TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            atendimento_module_1.AtendimentoModule,
            monitor_module_1.MonitorModule,
            typeorm_1.TypeOrmModule.forFeature([
                atendimento_entity_1.AtendimentoEntity,
                urgencia_entity_1.UrgenciaEntity,
                ticket_entity_1.TicketEntity,
                situacao_entity_1.SituacaoEntity,
                solicitante_entity_1.SolicitanteEntity,
                motivo_entity_1.MotivoEntity,
                user_entity_1.UserEntity,
                acao_entity_1.AcaoEntity,
                servico_entity_1.ServicoEntity,
                chave_entity_1.ChaveEntity,
                origem_entity_1.OrigemEntity,
            ]),
            platform_express_1.MulterModule.register({
                storage: multer.diskStorage({
                    destination: function (req, file, callback) {
                        const path = (req.params.ticketcd && req.params.acaocd)
                            ? `./anexos/${req.params.ticketcd}/${req.params.acaocd}`
                            : './anexos/images';
                        fs.mkdirSync(path, { recursive: true });
                        return callback(null, path);
                    },
                    filename: function (req, file, callback) {
                        return callback(null, (req.params.ticketcd && req.params.acaocd)
                            ? file.originalname
                            : `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`);
                    }
                }),
            }),
        ],
        providers: [ticket_service_1.TicketService, urgencia_service_1.UrgenciaService, acao_service_1.AcaoService, situacao_service_1.SituacaoService, servico_service_1.ServicoService, ticket_subscriber_1.TicketSubscriber, acao_subscriber_1.AcaoSubscriber, servico_subscriber_1.ServicoSubscriber],
        controllers: [ticket_controller_1.TicketController],
        exports: [situacao_service_1.SituacaoService, urgencia_service_1.UrgenciaService, ticket_service_1.TicketService],
    })
], TicketModule);
exports.TicketModule = TicketModule;
//# sourceMappingURL=ticket.module.js.map