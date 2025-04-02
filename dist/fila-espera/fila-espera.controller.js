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
exports.FilaEsperaController = void 0;
const common_1 = require("@nestjs/common");
const fila_espera_service_1 = require("./fila-espera.service");
const db_filter_1 = require("../shared/db.filter");
const fila_espera_dto_1 = require("./fila-espera.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../shared/roles.decorator");
let FilaEsperaController = class FilaEsperaController {
    constructor(filaEsperaService) {
        this.filaEsperaService = filaEsperaService;
    }
    async add(req, data) {
        return await this.filaEsperaService.add(data, req.user);
    }
    async getOnline() {
        return await this.filaEsperaService.allOnline();
    }
    async delete(req, cd) {
        return await this.filaEsperaService.delete(cd, req.user);
    }
    async all(allDTO) {
        return await this.filaEsperaService.all(allDTO);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('atendimento.handle-queue'),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, fila_espera_dto_1.FilaEsperaCreateDTO]),
    __metadata("design:returntype", Promise)
], FilaEsperaController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('get/online'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilaEsperaController.prototype, "getOnline", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento.handle-queue'),
    (0, common_1.Delete)('delete/:cd'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FilaEsperaController.prototype, "delete", null);
__decorate([
    (0, roles_decorator_1.Roles)('atendimento.handle-queue'),
    (0, common_1.Post)('all'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fila_espera_dto_1.FilaEsperaAllDTO]),
    __metadata("design:returntype", Promise)
], FilaEsperaController.prototype, "all", null);
FilaEsperaController = __decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('fila-espera'),
    __metadata("design:paramtypes", [fila_espera_service_1.FilaEsperaService])
], FilaEsperaController);
exports.FilaEsperaController = FilaEsperaController;
//# sourceMappingURL=fila-espera.controller.js.map