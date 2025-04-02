"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilaEsperaGateway = void 0;
const auth_service_1 = require("../auth/auth.service");
const ws_guard_1 = require("../shared/ws.guard");
var cookieParser = require('cookie-parser');
class Client {
    constructor(socket, user) {
        this.socket = socket;
        this.user = user;
    }
}
class FilaEsperaGateway {
}
exports.FilaEsperaGateway = FilaEsperaGateway;
//# sourceMappingURL=fila-espera.gateway.js.map