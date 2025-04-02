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
exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const evento_entity_1 = require("./evento.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const moment = require("moment-timezone");
let AgendaService = class AgendaService {
    constructor(eventoRepository, connection) {
        this.eventoRepository = eventoRepository;
        this.connection = connection;
    }
    async all(dtinicio, dtfim, user, userTarget) {
        const indexDiaInicio = moment.tz(`${dtinicio} 00:00:00`, 'America/Sao_Paulo').utc().unix();
        const indexDiaFim = moment.tz(`${dtfim} 23:59:59`, 'America/Sao_Paulo').utc().unix();
        let recorrenciaQb = this.eventoRepository.createQueryBuilder('evento')
            .leftJoinAndMapMany('evento.users', 'evento.users', 'user')
            .andWhere('evento.fgrecorrente = TRUE');
        if (userTarget) {
            recorrenciaQb.andWhere('user.cd = :userTarget', { userTarget });
        }
        if (!user.roles.includes('agenda.all')) {
            recorrenciaQb.andWhere('user.cd = :cduser', { cduser: user.cd });
        }
        const recorrencias = await recorrenciaQb.getMany();
        const weekDays = {};
        const monthDays = {};
        if (dtinicio !== dtfim) {
            let dateIterator = moment.tz(dtinicio, 'America/Sao_Paulo');
            for (; dateIterator.format('YYYY-MM-DD') <= dtfim; dateIterator.add({ day: 1 })) {
                const weekDay = dateIterator.day();
                const monthDay = parseInt(dateIterator.format('D'));
                weekDays[weekDay] = weekDays[weekDay] || [];
                monthDays[monthDay] = monthDays[monthDay] || [];
                weekDays[weekDay].push(dateIterator.format('YYYY-MM-DD'));
                monthDays[monthDay].push(dateIterator.format('YYYY-MM-DD'));
            }
        }
        else {
            const date = moment.tz(dtinicio, 'America/Sao_Paulo');
            const weekDay = date.day();
            const monthDay = parseInt(date.format('D'));
            weekDays[weekDay] = [date.format('YYYY-MM-DD')];
            monthDays[monthDay] = [date.format('YYYY-MM-DD')];
        }
        let eventoQb = this.eventoRepository.createQueryBuilder('evento')
            .leftJoinAndMapMany('evento.users', 'evento.users', 'user')
            .andWhere('indexdtinicio >= :indexDiaInicio AND indexdtfim <= :indexDiaFim AND fgrecorrente = FALSE', { indexDiaInicio, indexDiaFim });
        if (userTarget != null) {
            eventoQb.andWhere('user.cd = :userTarget', { userTarget });
        }
        if (!user.roles.includes('agenda.all')) {
            eventoQb.andWhere('user.cd = :cduser', { cduser: user.cd });
        }
        const eventos = await eventoQb.orderBy('evento.dtinicio', 'ASC').getMany();
        for (const recorrencia of recorrencias) {
            const tempoInicio = (recorrencia._cdtipoagendamento === 1) ? '00:00' : recorrencia.jsrecorrencia.inicio;
            const tempoFim = (recorrencia._cdtipoagendamento === 1) ? '23:59' : recorrencia.jsrecorrencia.fim;
            if (recorrencia.jsrecorrencia.id === 'mensal') {
                for (const day of recorrencia.jsrecorrencia.list) {
                    if (monthDays[day]) {
                        for (const date of monthDays[day]) {
                            const dtinicio = moment.tz(`${date} ${tempoInicio}`, 'America/Sao_Paulo').toDate();
                            const dtfim = moment.tz(`${date} ${tempoFim}`, 'America/Sao_Paulo').toDate();
                            eventos.push(Object.assign(Object.assign({}, recorrencia), { dtinicio,
                                dtfim }));
                        }
                    }
                }
            }
            else {
                for (const weekDay of recorrencia.jsrecorrencia.list) {
                    if (weekDays[weekDay]) {
                        for (const date of weekDays[weekDay]) {
                            const dtinicio = moment.tz(`${date} ${tempoInicio}`, 'America/Sao_Paulo').toDate();
                            const dtfim = moment.tz(`${date} ${tempoFim}`, 'America/Sao_Paulo').toDate();
                            eventos.push(Object.assign(Object.assign({}, recorrencia), { dtinicio,
                                dtfim }));
                        }
                    }
                }
            }
        }
        return eventos;
    }
    async fixarEvento(dto, user) {
        const evento = await this.eventoRepository.findOneOrFail({ cd: dto.cd });
        if (evento.fgcadeado && evento._cdresponsavel !== user.cd) {
            throw new common_1.ForbiddenException;
        }
        if (!evento.fgrecorrente) {
            throw new common_1.HttpException('Recurring events only can be pinned', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user.roles.includes('agenda.all') && evento._cdusers.includes(user.cd)) {
            throw new common_1.ForbiddenException;
        }
        if (dto.mmdesc) {
            evento.mmdesc = dto.mmdesc;
        }
        evento.indexdtinicio = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).utc().unix();
        evento.indexdtfim = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).utc().unix();
        if (evento._cdtipoagendamento !== 1) {
            {
                const [hour, minute] = evento.jsrecorrencia.inicio.split('-').map(it => parseInt(it));
                evento.dtinicio = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').set({ hour, minute }).toDate();
            }
            {
                let [hour, minute] = evento.jsrecorrencia.fim.split('-').map(it => parseInt(it));
                evento.dtfim = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').set({ hour, minute }).toDate();
            }
        }
        else {
            evento.dtinicio = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').utc().toDate();
            evento.dtfim = moment.tz(dto.dtrecorrente, 'America/Sao_Paulo').utc().toDate();
        }
        evento.fgrecorrente = false;
        evento.cdeventorecorrente = evento.cd;
        evento.users = evento._cdusers.map(cd => new user_entity_1.UserEntity(cd));
        evento.cdtipoagendamento = evento._cdtipoagendamento;
        evento.cdchave = evento._cdchave;
        evento.cdresponsavel = evento._cdresponsavel;
        evento.jsrecorrencia = {
            id: 'mensal',
            list: [],
            inicio: null,
            fim: null
        };
        delete evento.cd;
        await this.eventoRepository.save(evento);
    }
    async deleteEvento(cd, user) {
        const evento = await this.eventoRepository.findOneOrFail(cd);
        if (evento.fgcadeado && evento._cdresponsavel !== user.cd) {
            throw new common_1.ForbiddenException;
        }
        await this.eventoRepository.delete(cd);
    }
    async duplicarEvento(dto, user) {
        const evento = await this.eventoRepository.findOneOrFail({ cd: dto.cd });
        if (evento.fgcadeado && evento._cdresponsavel !== user.cd) {
            throw new common_1.ForbiddenException;
        }
        if (!user.roles.includes('agenda.all') && !evento._cdusers.includes(user.cd)) {
            throw new common_1.ForbiddenException;
        }
        evento.fgrecorrente = false;
        const dtinicio = evento.dtinicio || '1998-07-08';
        const dtfim = evento.dtfim || '1998-07-08';
        const eventos = dto.dates.map(date => {
            const [year, month, day] = date.split('-').map(it => parseInt(it));
            const _evento = Object.assign({}, evento);
            _evento.dtinicio = moment(dtinicio).set({ date: day, month: month - 1, year }).toDate();
            _evento.dtfim = moment(dtfim).set({ date: day, month: month - 1, year }).toDate();
            const indexdtinicio = moment.tz(_evento.dtinicio, 'America/Sao_Paulo')
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .utc()
                .unix();
            var indexdtfim = moment.tz(_evento.dtfim, 'America/Sao_Paulo')
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .utc()
                .unix();
            delete _evento.cd;
            return Object.assign(Object.assign({}, _evento), { users: _evento._cdusers.map(cd => new user_entity_1.UserEntity(cd)), cdresponsavel: _evento._cdresponsavel, cdtipoagendamento: _evento._cdtipoagendamento, cdchave: _evento._cdchave, indexdtinicio,
                indexdtfim });
        });
        await this.eventoRepository.save(eventos);
    }
    async addOrUpdateEvent(eventoDto, user, operation, manager = null) {
        manager = manager || this.connection.manager;
        if (operation === 'update') {
            const evento = await this.eventoRepository.findOneOrFail(eventoDto['cd']);
            if (evento.fgcadeado && evento._cdresponsavel !== user.cd) {
                throw new common_1.ForbiddenException;
            }
        }
        if (!eventoDto.fgrecorrente) {
            eventoDto.dtfim = moment.tz(eventoDto.dtfim, 'America/Sao_Paulo').utc().toDate();
            eventoDto.dtinicio = moment.tz(eventoDto.dtinicio, 'America/Sao_Paulo').utc().toDate();
            if (eventoDto.dtrealizadoinicio && eventoDto.dtrealizadofim) {
                eventoDto.dtrealizadoinicio = moment.tz(eventoDto.dtrealizadoinicio, 'America/Sao_Paulo').utc().toDate();
                eventoDto.dtrealizadofim = moment.tz(eventoDto.dtrealizadofim, 'America/Sao_Paulo').utc().toDate();
            }
            var indexdtinicio = moment.tz(eventoDto.dtinicio, 'America/Sao_Paulo')
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .utc()
                .unix();
            var indexdtfim = moment.tz(eventoDto.dtfim, 'America/Sao_Paulo')
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .utc()
                .unix();
        }
        const eventoEntity = this.eventoRepository.create(Object.assign(Object.assign({}, eventoDto), { users: eventoDto.users.map(cduser => new user_entity_1.UserEntity(cduser)), cdresponsavel: user.cd, indexdtinicio,
            indexdtfim }));
        if (operation === 'update') {
            delete eventoEntity.cdresponsavel;
        }
        return await manager.save(eventoEntity);
    }
};
AgendaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evento_entity_1.EventoEntity)),
    __param(1, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], AgendaService);
exports.AgendaService = AgendaService;
//# sourceMappingURL=agenda.service.js.map