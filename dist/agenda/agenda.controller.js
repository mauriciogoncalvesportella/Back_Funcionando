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
exports.AgendaController = void 0;
const common_1 = require("@nestjs/common");
const agenda_service_1 = require("./agenda.service");
const db_filter_1 = require("../shared/db.filter");
const agenda_dto_1 = require("./agenda.dto");
const tpagendamento_service_1 = require("./tpagendamento.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../shared/roles.guard");
const roles_decorator_1 = require("../shared/roles.decorator");
let AgendaController = class AgendaController {
    constructor(agendaService, tipoAgendamentoService) {
        this.agendaService = agendaService;
        this.tipoAgendamentoService = tipoAgendamentoService;
    }
    async eventoAdd(req, data) {
        return await this.agendaService.addOrUpdateEvent(data, req.user, 'add');
    }
    async eventoUpdate(req, data) {
        return await this.agendaService.addOrUpdateEvent(data, req.user, 'update');
    }
    async fixarEvento(req, data) {
        return await this.agendaService.fixarEvento(data, req.user);
    }
    async eventoDuplicar(req, data) {
        return await this.agendaService.duplicarEvento(data, req.user);
    }
    async eventoDelete(req, cd) {
        return await this.agendaService.deleteEvento(cd, req.user);
    }
    async eventoAll(req, userTarget, dtinicio, dtfim) {
        return await this.agendaService.all(dtinicio, dtfim, req.user, userTarget);
    }
    async tipoAgendamentoAll() {
        return await this.tipoAgendamentoService.all();
    }
    async tipoAgendamentoAdd(data) {
        await this.tipoAgendamentoService.add(data);
    }
    async tipoAgendamentoUpdate(data) {
        await this.tipoAgendamentoService.update(data);
    }
    async tipoAgendamentoDelete(cd) {
        await this.tipoAgendamentoService.delete(cd);
    }
};
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('evento/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, agenda_dto_1.EventoAddDTO]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "eventoAdd", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('evento/update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, agenda_dto_1.EventoUpdateDTO]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "eventoUpdate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('evento/fixar'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, agenda_dto_1.EventoFixarDTO]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "fixarEvento", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('evento/duplicar/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, agenda_dto_1.EventoDuplicarDTO]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "eventoDuplicar", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('evento/delete/:cd'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "eventoDelete", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('evento/all/:dtinicio/:dtfim'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('userTarget')),
    __param(2, (0, common_1.Param)('dtinicio')),
    __param(3, (0, common_1.Param)('dtfim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "eventoAll", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('tipo-agendamento/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "tipoAgendamentoAll", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('tipo-agendamento/add'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: agenda_dto_1.TipoAgendamentoAddDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "tipoAgendamentoAdd", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('tipo-agendamento/update'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: agenda_dto_1.TipoAgendamentoUpdateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "tipoAgendamentoUpdate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('tipo-agendamento/delete/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "tipoAgendamentoDelete", null);
AgendaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('agenda'),
    (0, common_1.Controller)('agenda'),
    __metadata("design:paramtypes", [agenda_service_1.AgendaService,
        tpagendamento_service_1.TipoAgendamentoService])
], AgendaController);
exports.AgendaController = AgendaController;
//# sourceMappingURL=agenda.controller.js.map