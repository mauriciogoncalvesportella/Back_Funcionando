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
exports.Xc3Service = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chavefone_entity_1 = require("./chavefone.entity");
const typeorm_2 = require("typeorm");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const chave_entity_1 = require("./chave.entity");
const user_entity_1 = require("../user/user.entity");
const atendimento_service_1 = require("../atendimento/atendimento.service");
const atendimento_dto_1 = require("../atendimento/atendimento.dto");
let Xc3Service = class Xc3Service {
    constructor(chaveFoneRepository, chaveRepository, userRepository, websocketGateway, atendimentoService) {
        this.chaveFoneRepository = chaveFoneRepository;
        this.chaveRepository = chaveRepository;
        this.userRepository = userRepository;
        this.websocketGateway = websocketGateway;
        this.atendimentoService = atendimentoService;
    }
    async addAtendimento(idRamal, cdchave) {
        const userEntity = await this.userRepository.findOneOrFail({ where: { idRamal } });
        const chaveEntity = await this.chaveRepository.findOneOrFail(cdchave);
        const user = {
            cd: userEntity.cd,
            idlogin: userEntity.idlogin,
            roles: []
        };
        const atendimentoDto = {
            cdchave,
            cdorigem: 9,
            cdmotivo: 9,
            cdfila: undefined
        };
        await this.atendimentoService.add(atendimentoDto, user);
        this.websocketGateway.notifyUser('refreshAtendimento', chaveEntity.idfantasia, user.cd);
    }
    async getFoneList() {
        const entities = await this.chaveFoneRepository.find({ where: { cdchave: null } });
        return entities.map(entity => entity.fone);
    }
    async addFone(fone) {
        const chaveFoneEntity = this.chaveFoneRepository.create({ fone });
        await this.chaveFoneRepository.insert(chaveFoneEntity);
        this.websocketGateway.notifyRoom('Fone', 'add', fone);
    }
    async bind(fone, cdchave, idnome = '') {
        const chaveFoneEntity = await this.chaveFoneRepository.findOneOrFail({ fone });
        chaveFoneEntity.cdchave = cdchave;
        chaveFoneEntity.idnome = idnome !== null && idnome !== void 0 ? idnome : chaveFoneEntity.idnome;
        await this.chaveFoneRepository.save(chaveFoneEntity);
        this.websocketGateway.notifyRoom('Fone', 'remove', fone);
    }
    async getClientInfo(phone) {
        var _a;
        const chaveFoneEntity = await this.chaveFoneRepository.findOne({
            where: { fone: phone },
        });
        if (chaveFoneEntity != undefined && chaveFoneEntity._cdchave != undefined) {
            const chaveEntity = await this.chaveRepository.findOneOrFail(chaveFoneEntity._cdchave);
            const userEntity = chaveEntity._cdresponsavel == undefined
                ? null
                : await this.userRepository.findOne({ where: { cd: chaveEntity._cdresponsavel } });
            return {
                status: 'OK',
                phone: phone,
                name: chaveEntity.idfantasia,
                code: chaveEntity.cd,
                indebt: chaveEntity.dtvalidade < new Date(),
                supervisor: (_a = userEntity === null || userEntity === void 0 ? void 0 : userEntity.idRamal) !== null && _a !== void 0 ? _a : "",
            };
        }
        if (chaveFoneEntity == undefined) {
            await this.addFone(phone);
        }
        return {
            status: 'WAITING'
        };
    }
};
Xc3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chavefone_entity_1.ChaveFoneEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(chave_entity_1.ChaveEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        websocket_gateway_1.WebsocketGateway,
        atendimento_service_1.AtendimentoService])
], Xc3Service);
exports.Xc3Service = Xc3Service;
//# sourceMappingURL=xc3.service.js.map