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
exports.ChaveController = void 0;
const common_1 = require("@nestjs/common");
const chave_service_1 = require("./chave.service");
const chave_dto_1 = require("./chave.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const commerce_guard_1 = require("./commerce.guard");
const db_filter_1 = require("../shared/db.filter");
const info_interceptor_1 = require("../shared/info.interceptor");
let ChaveController = class ChaveController {
    constructor(chaveService) {
        this.chaveService = chaveService;
    }
    allClientesFromChave(req, cd) {
        return this.chaveService.allSolicitantesFromChave(cd);
    }
    addSolicitante(solicitante) {
        return this.chaveService.addSolicitante(solicitante);
    }
    async updateDtvalidade(dto) {
        return this.chaveService.updateDtvalidade(dto);
    }
    allChaves(req) {
        return this.chaveService.getAllChaves();
    }
    async allChavesFones(dto) {
        return this.chaveService.getAllChavesFones(dto);
    }
    async updateChaveFone(dto) {
        await this.chaveService.updateChaveFone(dto);
    }
    async createChaveFone(dto) {
        return await this.chaveService.createChaveFone(dto);
    }
    async deleteChaveFone(cd) {
        return await this.chaveService.deleteChaveFone(cd);
    }
    add(data) {
        return this.chaveService.add(data);
    }
    getVersao(data) {
        return this.chaveService.getVersao(data);
    }
    updateVersao(data) {
        return this.chaveService.updateVersao(data);
    }
    updateChave(data) {
        return this.chaveService.updateChave(data);
    }
};
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('chave/solicitante/all-from-chave/:cd'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "allClientesFromChave", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('chave/solicitante/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.addSolicitanteDTO]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "addSolicitante", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.Post)('chave/update-dt-validade'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.updateDtvalidadeDTO]),
    __metadata("design:returntype", Promise)
], ChaveController.prototype, "updateDtvalidade", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('chave/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "allChaves", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('chave/all-chaves-fones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.AllChavesFonesDTO]),
    __metadata("design:returntype", Promise)
], ChaveController.prototype, "allChavesFones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('chave/update-chave-fone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.UpdateChaveFoneDTO]),
    __metadata("design:returntype", Promise)
], ChaveController.prototype, "updateChaveFone", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('chave/create-chave-fone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.CreateChaveFoneDTO]),
    __metadata("design:returntype", Promise)
], ChaveController.prototype, "createChaveFone", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('chave/delete-chave-fone/:cd'),
    __param(0, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChaveController.prototype, "deleteChaveFone", null);
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.UseGuards)(commerce_guard_1.CommerceGuard),
    (0, common_1.Post)('commerce/add'),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: chave_dto_1.ChaveCreateDTO }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "add", null);
__decorate([
    (0, common_1.UseGuards)(commerce_guard_1.CommerceGuard),
    (0, common_1.Post)('commerce/versao'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.getVersaoDTO]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "getVersao", null);
__decorate([
    (0, common_1.UseGuards)(commerce_guard_1.CommerceGuard),
    (0, common_1.Post)('commerce/update/versao'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.updateVersaoDTO]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "updateVersao", null);
__decorate([
    (0, common_1.UseGuards)(commerce_guard_1.CommerceGuard),
    (0, common_1.Post)('commerce/update/chave'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chave_dto_1.updateChaveDTO]),
    __metadata("design:returntype", void 0)
], ChaveController.prototype, "updateChave", null);
ChaveController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chave_service_1.ChaveService])
], ChaveController);
exports.ChaveController = ChaveController;
//# sourceMappingURL=chave.controller.js.map