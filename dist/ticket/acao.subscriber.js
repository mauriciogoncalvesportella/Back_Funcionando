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
exports.AcaoSubscriber = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const acao_entity_1 = require("./acao.entity");
const servico_entity_1 = require("./servico.entity");
let AcaoSubscriber = class AcaoSubscriber {
    constructor(connection, servicoRepository) {
        this.connection = connection;
        this.servicoRepository = servicoRepository;
        connection.subscribers.push(this);
    }
    listenTo() {
        return acao_entity_1.AcaoEntity;
    }
    async beforeInsert(event) {
    }
};
AcaoSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __param(1, (0, typeorm_2.InjectRepository)(servico_entity_1.ServicoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.Repository])
], AcaoSubscriber);
exports.AcaoSubscriber = AcaoSubscriber;
//# sourceMappingURL=acao.subscriber.js.map