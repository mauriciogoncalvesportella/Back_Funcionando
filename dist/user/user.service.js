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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const grupoAcesso_entity_1 = require("./grupoAcesso.entity");
let UserService = class UserService {
    constructor(userRepository, grupoAcessoRepository) {
        this.userRepository = userRepository;
        this.grupoAcessoRepository = grupoAcessoRepository;
    }
    async all() {
        const users = await this.userRepository.find({
            relations: ['grupoacesso'],
            select: ["cd", "idlogin", "idemail", "idnome", "idcolor", "jsturnos"],
        });
        return users;
    }
    async addGrupoAcesso(data) {
        await this.grupoAcessoRepository.save(data);
    }
    async allGrupoAcesso() {
        return await this.grupoAcessoRepository.find();
    }
    async findOne(idlogin) {
        const user = await this.userRepository.findOne({
            where: { idlogin },
            relations: ['grupoacesso']
        });
        if (!user)
            return undefined;
        return user;
    }
    async login(idlogin, idsenha) {
        const user = await this.userRepository.findOne({ where: { idlogin } });
        if (!user || !(await user.comparePassword(idsenha))) {
            throw new common_1.HttpException('Invalid username/password', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async register(data) {
        const { idlogin } = data;
        let user = await this.userRepository.findOne({ where: { idlogin } });
        if (user) {
            throw new common_1.HttpException('User already exist', common_1.HttpStatus.CONFLICT);
        }
        user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }
    async update(data) {
        try {
            let user = await this.userRepository.findOneOrFail({ where: { cd: data.cd } });
            if (data.idlogin)
                user.idlogin = data.idlogin;
            if (data.idsenha) {
                user.idsenha = data.idsenha;
                await user.hashSenha();
            }
            if (data.grupoacesso)
                user.grupoacesso = data.grupoacesso;
            if (data.idemail)
                user.idemail = data.idemail;
            if (data.idnome)
                user.idnome = data.idnome;
            if (data.jsturnos)
                user.jsturnos = data.jsturnos;
            if (data.idcolor)
                user.idcolor = data.idcolor;
            await this.userRepository.save(user);
        }
        catch (err) {
            throw new common_1.HttpException('Erro ao modificar', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(grupoAcesso_entity_1.GrupoAcessoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map