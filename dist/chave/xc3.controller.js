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
exports.Xc3Controller = void 0;
const common_1 = require("@nestjs/common");
const xc3_service_1 = require("./xc3.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const atendimento_service_1 = require("../atendimento/atendimento.service");
let Xc3Controller = class Xc3Controller {
    constructor(xc3Service) {
        this.xc3Service = xc3Service;
    }
    async getFoneInfo(fone) {
        var _a;
        try {
            if (!fone) {
                throw new Error('phone is null');
            }
            return await this.xc3Service.getClientInfo(fone);
        }
        catch (err) {
            console.error(err);
            return new common_1.InternalServerErrorException({
                status: 'ERROR',
                message: (_a = err.message) !== null && _a !== void 0 ? _a : err
            });
        }
    }
    async addAtendimento(ramal, cdchave) {
        await this.xc3Service.addAtendimento(ramal, cdchave);
    }
    async bind(data) {
        const { fone, cdchave } = data;
        if (fone || cdchave) {
            this.xc3Service.bind(fone, cdchave, data.idnome);
            return;
        }
        throw new common_1.BadRequestException('Fone or Chave null');
    }
    async getFoneList() {
        return await this.xc3Service.getFoneList();
    }
};
__decorate([
    (0, common_1.Post)('phone-info'),
    __param(0, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Xc3Controller.prototype, "getFoneInfo", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Query)('ramal')),
    __param(1, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], Xc3Controller.prototype, "addAtendimento", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bind'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Xc3Controller.prototype, "bind", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('fone-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Xc3Controller.prototype, "getFoneList", null);
Xc3Controller = __decorate([
    (0, common_1.Controller)('3cx'),
    __metadata("design:paramtypes", [xc3_service_1.Xc3Service])
], Xc3Controller);
exports.Xc3Controller = Xc3Controller;
//# sourceMappingURL=xc3.controller.js.map