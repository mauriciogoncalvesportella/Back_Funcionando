"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const logging_interceptor_1 = require("./shared/logging.interceptor");
const auth_module_1 = require("./auth/auth.module");
const chave_module_1 = require("./chave/chave.module");
const config_1 = require("@nestjs/config");
const atendimento_module_1 = require("./atendimento/atendimento.module");
const monitor_module_1 = require("./monitor/monitor.module");
const table_module_1 = require("./table/table.module");
const ticket_module_1 = require("./ticket/ticket.module");
const agenda_module_1 = require("./agenda/agenda.module");
const cadastro_subscriber_1 = require("./shared/cadastro.subscriber");
const files_module_1 = require("./files/files.module");
const fila_espera_module_1 = require("./fila-espera/fila-espera.module");
const websocket_module_1 = require("./websocket/websocket.module");
const version_control_middleware_1 = require("./shared/version-control.middleware");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(version_control_middleware_1.VersionControlMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DB_URL,
                entities: [
                    __dirname + '/dist/../**/**.entity{.ts,.js}'
                ],
                synchronize: true,
                ssl: false,
                logging: ['error'],
                extra: {
                    ssl: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/api/static-images',
                rootPath: process.env.PROD ? (0, path_1.join)(__dirname, 'anexos', 'images') : (0, path_1.join)(__dirname, '..', 'anexos', 'images'),
            }),
            auth_module_1.AuthModule,
            chave_module_1.ChaveModule,
            atendimento_module_1.AtendimentoModule,
            monitor_module_1.MonitorModule,
            table_module_1.TableModule,
            ticket_module_1.TicketModule,
            agenda_module_1.AgendaModule,
            files_module_1.FilesModule,
            fila_espera_module_1.FilaEsperaModule,
            websocket_module_1.WebsocketModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LogginInterceptor,
            },
            cadastro_subscriber_1.CadastroSubscriber,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map