"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xc3Guard = void 0;
class Xc3Guard {
    canActivate(context) {
        let request = context.switchToHttp().getRequest();
        let token = process.env.XC3_TOKEN;
        let headerToken = request.headers.authorization;
        return token == headerToken;
    }
}
exports.Xc3Guard = Xc3Guard;
//# sourceMappingURL=xc3.guard.js.map