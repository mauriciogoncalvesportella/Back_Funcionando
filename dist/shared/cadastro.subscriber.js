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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroSubscriber = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const tipoagendamento_entity_1 = require("../agenda/tipoagendamento.entity");
const motivo_entity_1 = require("../atendimento/motivo.entity");
const situacao_entity_1 = require("../ticket/situacao.entity");
const tpagendamento_service_1 = require("../agenda/tpagendamento.service");
const situacao_service_1 = require("../ticket/situacao.service");
const origem_service_1 = require("../atendimento/origem.service");
const origem_entity_1 = require("../atendimento/origem.entity");
const motivo_service_1 = require("../atendimento/motivo.service");
const urgencia_service_1 = require("../ticket/urgencia.service");
let CadastroSubscriber = class CadastroSubscriber {
    constructor(connection, tipoAgendamentoService, situacaoService, origemService, motivoService, urgenciaService) {
        this.connection = connection;
        this.tipoAgendamentoService = tipoAgendamentoService;
        this.situacaoService = situacaoService;
        this.origemService = origemService;
        this.motivoService = motivoService;
        this.urgenciaService = urgenciaService;
        connection.subscribers.push(this);
    }
    async beforeInsert(event) {
        this.resolveCadastroService(event.metadata.name);
        if (this.cadastroService) {
            event.entity.nordem = await this.cadastroService.nextOrdem();
        }
    }
    resolveCadastroService(entityName) {
        const services = {
            'SituacaoEntity': this.situacaoService,
            'TipoAgendamentoEntity': this.tipoAgendamentoService,
            'OrigemEntity': this.origemService,
            'MotivoEntity': this.motivoService,
            'UrgenciaEntity': this.urgenciaService,
            'default': null,
        };
        this.cadastroService = services[entityName] || services.default;
    }
};
CadastroSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        tpagendamento_service_1.TipoAgendamentoService,
        situacao_service_1.SituacaoService,
        origem_service_1.OrigemService,
        motivo_service_1.MotivoService,
        urgencia_service_1.UrgenciaService])
], CadastroSubscriber);
exports.CadastroSubscriber = CadastroSubscriber;
//# sourceMappingURL=cadastro.subscriber.js.map