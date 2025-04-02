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
exports.AtendimentoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const atendimento_dto_1 = require("./atendimento.dto");
const atendimento_service_1 = require("./atendimento.service");
const origem_service_1 = require("./origem.service");
const roles_guard_1 = require("../shared/roles.guard");
const roles_decorator_1 = require("../shared/roles.decorator");
const db_filter_1 = require("../shared/db.filter");
const motivo_service_1 = require("./motivo.service");
let AtendimentoController = class AtendimentoController {
    constructor(origemService, atendimentoService, motivoService) {
        this.origemService = origemService;
        this.atendimentoService = atendimentoService;
        this.motivoService = motivoService;
    }
    refreshState(req) {
        return req.user;
    }
    add(req, data) {
        return this.atendimentoService.add(data, req.user);
    }
    stopStart(req, data) {
        return this.atendimentoService.stopStart(data, req.user);
    }
    getOnline(req) {
        return this.atendimentoService.getOnline();
    }
    all(req) {
        return this.atendimentoService.all(req.user);
    }
    done(req, data) {
        return this.atendimentoService.done(data, req.user);
    }
    allAdmin(req, data) {
        return this.atendimentoService.allAdmin(data, req.user);
    }
    update(req, data) {
        return this.atendimentoService.update(data);
    }
    async changeMotivo(req, data) {
        await this.atendimentoService.changeMotivo(data, req.user, null);
    }
    destroy(cd) {
        this.atendimentoService.destroy(cd);
    }
    async origemAdd(data) {
        await this.origemService.add(data);
    }
    async origemAll() {
        return await this.origemService.all();
    }
    async origemUpdate(data) {
        await this.origemService.update(data);
    }
    async origemDelete(cd) {
        await this.origemService.delete(cd);
    }
    async motivoAdd(data) {
        await this.motivoService.add(data);
    }
    async motivoDelete(cd) {
        await this.motivoService.delete(cd);
    }
    async motivoUpdate(data) {
        await this.motivoService.update(data);
    }
    async motivoAll() {
        return await this.motivoService.all();
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "refreshState", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoAddDTO]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "add", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Post)('stop-start'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoStopStartDTO]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "stopStart", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('online'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "getOnline", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "all", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Post)('done'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoDoneDTO]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "done", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.Post)('all-admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoAdminDTO]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "allAdmin", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento.others.rewrite'),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoUpdateDTO]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento'),
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('change-motivo'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, atendimento_dto_1.AtendimentoChangeMotivoDTO]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "changeMotivo", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento.others.rewrite'),
    (0, common_1.Get)('destroy/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "destroy", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('origem/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atendimento_dto_1.OrigemAddDTO]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "origemAdd", null);
__decorate([
    (0, common_1.Get)('origem/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "origemAll", null);
__decorate([
    (0, common_1.Post)('origem/update'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: atendimento_dto_1.OrigemUpdateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "origemUpdate", null);
__decorate([
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('origem/delete/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "origemDelete", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('motivo/add'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: atendimento_dto_1.MotivoAddDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "motivoAdd", null);
__decorate([
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('motivo/delete/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "motivoDelete", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('motivo/update'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: atendimento_dto_1.MotivoUpdateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "motivoUpdate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('motivo/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AtendimentoController.prototype, "motivoAll", null);
AtendimentoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('atendimento'),
    __metadata("design:paramtypes", [origem_service_1.OrigemService,
        atendimento_service_1.AtendimentoService,
        motivo_service_1.MotivoService])
], AtendimentoController);
exports.AtendimentoController = AtendimentoController;
//# sourceMappingURL=atendimento.controller.js.map