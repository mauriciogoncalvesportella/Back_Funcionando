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
exports.ChaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chave_entity_1 = require("./chave.entity");
const typeorm_2 = require("typeorm");
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const solicitante_entity_1 = require("./solicitante.entity");
const date_fns_1 = require("date-fns");
const chavefone_entity_1 = require("./chavefone.entity");
let ChaveService = class ChaveService {
    constructor(solicitanteRepository, chaveRepository, chaveFoneRepository, connection) {
        this.solicitanteRepository = solicitanteRepository;
        this.chaveRepository = chaveRepository;
        this.chaveFoneRepository = chaveFoneRepository;
        this.connection = connection;
    }
    async add(listChavesDTO) {
        const listChaves = this.chaveRepository.create(listChavesDTO);
        await this.chaveRepository.save(listChaves);
    }
    async addSolicitante(item) {
        const solicitante = await this.solicitanteRepository.save(item);
        return solicitante.cd;
    }
    async updateDtvalidade(dto) {
        let chave = await this.chaveRepository.findOneOrFail({ cd: dto.cdchave });
        chave.dtvalidade = (0, date_fns_1.addDays)((0, date_fns_1.set)(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), dto.days + 1);
        await this.chaveRepository.save(chave);
        return { dtvalidade: chave.dtvalidade };
    }
    async getAllChaves() {
        return await this.chaveRepository.find({ cdsistema: 1 });
    }
    async getAllChavesFones(dto) {
        var _a;
        return await this.chaveRepository
            .createQueryBuilder('chave')
            .innerJoinAndSelect('chave.chaveFones', 'fones')
            .where(`UPPER(fones.fone) like UPPER(:search) or
        UPPER(fones.idnome) like UPPER(:search) or
        UPPER(chave.idcnpj) like UPPER(:search) or
        UPPER(chave.nmrazao) like UPPER(:search) or
        UPPER(chave.idfantasia) like UPPER(:search)
      `, { search: `%${(_a = dto.search) !== null && _a !== void 0 ? _a : ''}%` })
            .skip(dto.skip)
            .take(dto.take)
            .addOrderBy('chave.idfantasia')
            .addOrderBy('fones.idnome')
            .addOrderBy('fones.fone')
            .getMany();
    }
    async updateChaveFone(dto) {
        var _a, _b;
        const entity = await this.chaveFoneRepository.findOneOrFail(dto.cd);
        entity.idnome = (_a = dto.idnome) !== null && _a !== void 0 ? _a : entity.idnome;
        entity.fone = (_b = dto.fone) !== null && _b !== void 0 ? _b : entity.fone;
        return await this.chaveFoneRepository.save(entity);
    }
    async createChaveFone(dto) {
        const entity = new chavefone_entity_1.ChaveFoneEntity();
        entity.fone = dto.fone;
        entity.idnome = dto.idnome.toUpperCase();
        entity.cdchave = dto.cdchave;
        return await this.chaveFoneRepository.save(entity);
    }
    async deleteChaveFone(cd) {
        console.log(cd);
        await this.chaveFoneRepository.delete({ cd: cd });
    }
    async getVersao(data) {
        try {
            let chave = await this.chaveRepository.findOne({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
            if (!chave) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.BAD_REQUEST);
            }
            let { idversaoexe, idversaodb, dtatualizacao } = chave;
            return { idversaoexe, idversaodb, dtatualizacao };
        }
        catch (err) {
            if (err instanceof EntityNotFoundError_1.EntityNotFoundError) {
                throw new common_1.HttpException('Entity not found', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateVersao(data) {
        try {
            let chave = await this.chaveRepository.findOneOrFail({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
            if (data.idversaoexe)
                chave.idversaoexe = data.idversaoexe;
            if (data.idversaodb)
                chave.idversaodb = data.idversaodb;
            return await this.chaveRepository.save(chave);
        }
        catch (err) {
            if (err instanceof EntityNotFoundError_1.EntityNotFoundError) {
                throw new common_1.HttpException('Entity not found', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateChave(data) {
        try {
            let chave = await this.chaveRepository.findOneOrFail({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
            chave.dschave = data.dschave;
            chave.nrcontrole = data.nrcontrole;
            chave.nrusuarios = data.nrusuarios;
            chave.nrempresas = data.nrempresas;
            chave.dtexpedicao = new Date(data.dtexpedicao);
            chave.dtvalidade = new Date(data.dtvalidade);
            chave.dtatualizacao = new Date();
            await this.chaveRepository.save(chave);
        }
        catch (err) {
            if (err instanceof EntityNotFoundError_1.EntityNotFoundError) {
                throw new common_1.HttpException('Entity not found', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async allSolicitantesFromChave(cd) {
        try {
            return await this.solicitanteRepository.find({ cdchave: cd });
        }
        catch (err) {
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ChaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solicitante_entity_1.SolicitanteEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(chave_entity_1.ChaveEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(chavefone_entity_1.ChaveFoneEntity)),
    __param(3, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], ChaveService);
exports.ChaveService = ChaveService;
//# sourceMappingURL=chave.service.js.map