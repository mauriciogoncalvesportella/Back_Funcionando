"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBExceptionFilter = exports.ForbiddenError = void 0;
const common_1 = require("@nestjs/common");
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const typeorm_1 = require("typeorm");
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
let DBExceptionFilter = class DBExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        const code = exception.code;
        if (exception instanceof common_1.ForbiddenException) {
            status = 403;
        }
        else if (exception instanceof EntityNotFoundError_1.EntityNotFoundError) {
            status = 404;
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            switch (code) {
                case 'ER_DUP_ENTRY':
                    status = 409;
                    break;
                case 'ER_NO_REFERENCED_ROW_2':
                    status = 404;
                    break;
                default:
                    status = 400;
                    break;
            }
        }
        else {
            status = 400;
        }
        common_1.Logger.error(exception.stack);
        response.status(status).json({
            exception
        });
    }
};
DBExceptionFilter = __decorate([
    (0, common_1.Catch)(EntityNotFoundError_1.EntityNotFoundError, typeorm_1.QueryFailedError)
], DBExceptionFilter);
exports.DBExceptionFilter = DBExceptionFilter;
//# sourceMappingURL=db.filter.js.map