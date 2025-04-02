"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketStateAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const Auth_interfaces_1 = require("../../auth/Auth.interfaces");
const auth_service_1 = require("../../auth/auth.service");
class SocketStateAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, socketStateService, authService) {
        super(app);
        this.app = app;
        this.socketStateService = socketStateService;
        this.authService = authService;
    }
    create(port, options = {}) {
        this.server = super.createIOServer(port, options);
        this.server.use(async (socket, next) => {
            var _a, _b;
            const cookies = socket.handshake.headers.cookie;
            const token = (_b = (_a = cookies === null || cookies === void 0 ? void 0 : cookies.split('; ')) === null || _a === void 0 ? void 0 : _a.find((cookie) => cookie.startsWith('Authentication'))) === null || _b === void 0 ? void 0 : _b.split('=')[1];
            try {
                if (token && this.authService.validateToken(token)) {
                    socket.auth = this.authService.decode(token);
                    return next();
                }
                throw new Error('Invalid credentials');
            }
            catch (err) {
                common_1.Logger.error(err);
                socket.disconnect(true);
            }
        });
        return this.server;
    }
    bindClientConnect(server, callback) {
        this.server.on('connection', (socket) => {
            this.socketStateService.add(socket);
            socket.on('disconnect', () => {
                this.socketStateService.remove(socket);
            });
            callback(socket);
        });
    }
}
exports.SocketStateAdapter = SocketStateAdapter;
//# sourceMappingURL=socket-state.adapter.js.map