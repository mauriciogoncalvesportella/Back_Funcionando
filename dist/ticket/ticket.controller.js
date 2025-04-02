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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ticket_service_1 = require("./ticket.service");
const ticket_dto_1 = require("./ticket.dto");
const db_filter_1 = require("../shared/db.filter");
const acao_service_1 = require("./acao.service");
const situacao_service_1 = require("./situacao.service");
const roles_decorator_1 = require("../shared/roles.decorator");
const urgencia_service_1 = require("./urgencia.service");
const sharp = require("sharp");
const fs = require("fs");
var path = require('path');
let TicketController = class TicketController {
    constructor(ticketService, acaoService, situacaoService, urgenciaService) {
        this.ticketService = ticketService;
        this.acaoService = acaoService;
        this.situacaoService = situacaoService;
        this.urgenciaService = urgenciaService;
    }
    allUsersFromTicket(req, data) {
        return this.ticketService.allUsersFromTicket(data.cdticketArray, req.user);
    }
    async addTicket(req, data) {
        const emitAcao = data.emitAcao === true;
        delete data.emitAcao;
        const ret = await this.ticketService.addTicket(data, null, req.user, null, emitAcao);
        return ret;
    }
    kanban(req) {
        return this.ticketService.kanban(req.user);
    }
    getTicket(req, cd) {
        return this.ticketService.getTicket(req.user, cd);
    }
    allAcao(req, cdticket) {
        return this.acaoService.allAcao(cdticket, req.user);
    }
    deleteAcao(req, cdacao) {
        this.acaoService.delete(cdacao, req.user);
    }
    allFilter(req, data) {
        return this.ticketService.allFilter(data, req.user);
    }
    allFilterPaginate(req, data) {
        return this.ticketService.allFilterPaginate(data, req.user);
    }
    addTicketAcao(req, data) {
        return this.ticketService.addTicketAcao(data, req.user);
    }
    addAcao(req, data) {
        data.cduser = req.user.cd;
        return this.acaoService.addAcao(data, req.user, null, true);
    }
    uploadFile(files) {
        return;
    }
    async uploadImage(file, req) {
        const { filename, path } = file;
        const cdatendimento = req.get('cd-atendimento');
        const ref = `${cdatendimento ? cdatendimento + '-' : ''}${filename}.webp`;
        await sharp(path)
            .webp({ quality: 20 })
            .toFile("./anexos/images/" + ref);
        fs.rmSync(path);
        return {
            url: `${process.env.BACKEND_URL}/static-images/${ref}`
        };
    }
    downloadFile(req, res, data) {
        const filePath = path.resolve(`./anexos/${data.cdticket}/${data.cdacao}/${data.nmfile}`);
        res.sendFile(filePath);
    }
    allMeta(req) {
        return this.ticketService.allMeta();
    }
    changeSituacao(req, data) {
        return this.ticketService.changeSituacao(data, req.user);
    }
    updateJslistaKanban(req, data) {
        return this.ticketService.updateKanbanOrder(data, req.user);
    }
    async startServicoAcao(req, cdacao) {
        await this.acaoService.startServico(cdacao, req.user);
    }
    async stopServicoAcao(req) {
        await this.acaoService.stopServico(req.user);
    }
    getAcao(req, cdacao) {
        return this.acaoService.getAcao(cdacao, req.user);
    }
    async situacaoAll() {
        return this.situacaoService.all();
    }
    async situacaoUpdate(data) {
        await this.situacaoService.update(data);
    }
    async situacaoAdd(data) {
        await this.situacaoService.add(data);
    }
    async situacaoDelete(cd) {
        await this.situacaoService.delete(cd);
    }
    async urgenciaAll() {
        return this.urgenciaService.all();
    }
    async urgenciaUpdate(data) {
        await this.urgenciaService.update(data);
    }
    async urgenciaAdd(data) {
        await this.urgenciaService.add(data);
    }
    async urgenciaDelete(cd) {
        await this.urgenciaService.delete(cd);
    }
};
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('all-users-from-ticket'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.allUsersFromTicketDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "allUsersFromTicket", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('upsert'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketAddDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "addTicket", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('kanban'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "kanban", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('all/:cd'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getTicket", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('acao/all/:cdticket'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cdticket')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "allAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Delete)('acao/delete/:cdacao'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cdacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "deleteAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('all-filter'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketFilterDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "allFilter", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('all-filter/paginate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketFilterDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "allFilterPaginate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('add-ticket-acao'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketAcaoAddDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "addTicketAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('acao/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.AcaoAddDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "addAcao", null);
__decorate([
    (0, common_1.Post)('upload/:ticketcd/:acaocd'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('download'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, ticket_dto_1.AcaoAnexoDownloadDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('all-meta'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "allMeta", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('change-situacao'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.ChangeSituacaoDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "changeSituacao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('update-kanban-order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "updateJslistaKanban", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('acao/start-servico/:cdacao'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cdacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "startServicoAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('acao/stop-servico'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "stopServicoAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('acao/:cdacao'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cdacao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getAcao", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('situacao/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "situacaoAll", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('situacao/update'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: ticket_dto_1.SituacaoUpdateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "situacaoUpdate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('situacao/add'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: ticket_dto_1.SituacaoAddDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "situacaoAdd", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('situacao/delete/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "situacaoDelete", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Get)('urgencia/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "urgenciaAll", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('urgencia/update'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: ticket_dto_1.UrgenciaUpdateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "urgenciaUpdate", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('urgencia/add'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: ticket_dto_1.UrgenciaAddDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "urgenciaAdd", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('cadastro'),
    (0, common_1.Post)('urgencia/delete/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "urgenciaDelete", null);
TicketController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService,
        acao_service_1.AcaoService,
        situacao_service_1.SituacaoService,
        urgencia_service_1.UrgenciaService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map