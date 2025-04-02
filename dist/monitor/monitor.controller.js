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
exports.MonitorController = void 0;
const common_1 = require("@nestjs/common");
const monitor_service_1 = require("./monitor.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../shared/admin.guard");
const roles_guard_1 = require("../shared/roles.guard");
const roles_decorator_1 = require("../shared/roles.decorator");
const db_filter_1 = require("../shared/db.filter");
let MonitorController = class MonitorController {
    constructor(monitorService) {
        this.monitorService = monitorService;
    }
    monitor(req, date) {
        return this.monitorService.monitor(date, req.user);
    }
};
__decorate([
    (0, common_1.UseFilters)(db_filter_1.DBExceptionFilter),
    (0, roles_decorator_1.Roles)('monitor'),
    (0, common_1.Get)(':date'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "monitor", null);
MonitorController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('monitor'),
    __metadata("design:paramtypes", [monitor_service_1.MonitorService])
], MonitorController);
exports.MonitorController = MonitorController;
//# sourceMappingURL=monitor.controller.js.map