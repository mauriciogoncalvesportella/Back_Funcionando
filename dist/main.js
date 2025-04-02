"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const express = require("express");
const socket_state_service_1 = require("./websocket/socket-state/socket-state.service");
const auth_service_1 = require("./auth/auth.service");
const socket_state_adapter_1 = require("./websocket/socket-state/socket-state.adapter");
const initWebSocketAdapter = (app) => {
    const socketStateService = app.get(socket_state_service_1.SocketStateService);
    const authService = app.get(auth_service_1.AuthService);
    app.useWebSocketAdapter(new socket_state_adapter_1.SocketStateAdapter(app, socketStateService, authService));
    return app;
};
async function bootstrap() {
    console.log(process.env);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:8080',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'version-control',
            'x-csrf-token',
            'x-requested-with'
        ],
        exposedHeaders: ['Authorization']
    });
    initWebSocketAdapter(app);
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use(bodyParser.json({ limit: '20mb' }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(parseInt(process.env.PORT));
    console.log('servidor online');
}
bootstrap();
//# sourceMappingURL=main.js.map