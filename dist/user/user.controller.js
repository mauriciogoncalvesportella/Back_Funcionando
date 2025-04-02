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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const table_dto_1 = require("../table/table.dto");
const table_service_1 = require("../table/table.service");
const admin_guard_1 = require("../shared/admin.guard");
const roles_decorator_1 = require("../shared/roles.decorator");
const roles_guard_1 = require("../shared/roles.guard");
const db_filter_1 = require("../shared/db.filter");
let UserController = class UserController {
    constructor(userService, tableService) {
        this.userService = userService;
        this.tableService = tableService;
    }
    all(req) {
        return this.userService.all();
    }
    async addGrupoAcesso(data) {
        await this.userService.addGrupoAcesso(data);
        return;
    }
    async allGrupoAcesso(req) {
        return await this.userService.allGrupoAcesso();
    }
    getTable(req, nmtable) {
        return this.tableService.getTable(nmtable, req.user);
    }
    setTable(req, data, nmtable) {
        return this.tableService.setTable(nmtable, data, req.user);
    }
    register(data) {
        return this.userService.register(data);
    }
    update(data) {
        this.userService.update(data);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('bypass'),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "all", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)('grupo-acesso/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GrupoAcessoAddDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addGrupoAcesso", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Get)('grupo-acesso/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "allGrupoAcesso", null);
__decorate([
    (0, roles_decorator_1.Roles)('bypass'),
    (0, common_1.Get)('table/:nmtable'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('nmtable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getTable", null);
__decorate([
    (0, roles_decorator_1.Roles)('bypass'),
    (0, common_1.Post)('table/:nmtable'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('nmtable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, table_dto_1.TableCreateDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "setTable", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserUpdateDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, table_service_1.TableService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map