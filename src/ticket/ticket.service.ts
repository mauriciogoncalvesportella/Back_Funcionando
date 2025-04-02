import { Injectable, HttpException, HttpStatus, Catch, Logger, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { UrgenciaEntity } from './urgencia.entity';
import { Repository, Connection, QueryFailedError, EntityManager, Brackets, SelectQueryBuilder, Between} from 'typeorm';
import { SituacaoEntity } from './situacao.entity';
import { SolicitanteEntity } from 'src/chave/solicitante.entity';
import {TicketAddDTO, AcaoAddDTO, ChangeSituacaoDTO, TicketFilterDTO} from './ticket.dto';
import {TicketEntity} from './ticket.entity';
import {UserEntity} from 'src/user/user.entity';
import {AcaoEntity} from './acao.entity';
import {AtendimentoService} from 'src/atendimento/atendimento.service';
import {MotivoEntity} from 'src/atendimento/motivo.entity';
import {AcaoService} from './acao.service';
import { Response } from 'express'
import * as moment from 'moment-timezone'
import { utcToZonedTime, format } from 'date-fns-tz'
import {ChaveEntity} from 'src/chave/chave.entity';
import {OrigemEntity} from 'src/atendimento/origem.entity';

@Injectable()
export class TicketService {
  constructor(
    @Inject(forwardRef(() => AcaoService))
    private acaoService: AcaoService,
    
    private atendimentoService: AtendimentoService,

    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,

    @InjectRepository(UrgenciaEntity)
    private urgenciaRepository: Repository<UrgenciaEntity>,

    @InjectRepository(MotivoEntity)
    private motivoRepository: Repository<MotivoEntity>,

    @InjectRepository(SituacaoEntity)
    private situacaoRepository: Repository<SituacaoEntity>,

    @InjectRepository(OrigemEntity)
    private origemRepository: Repository<OrigemEntity>,

    @InjectRepository(SolicitanteEntity)
    private solicitanteRepository: Repository<SolicitanteEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AcaoEntity)
    private acaoRepository: Repository<AcaoEntity>,

    @InjectRepository(ChaveEntity)
    private chaveRepository: Repository<ChaveEntity>,

    @InjectConnection()
    private readonly connection: Connection,

    // private readonly redisCacheService: RedisCacheService,
  ) {}

  async getTicket (user: any, cd : number) {
    const dto : TicketFilterDTO = new TicketFilterDTO
    dto.cd = [cd]
    dto.users = null
    const ticket = await this.allFilterQueryBuilder(dto, user).getOne()
    return ticket
  }

  async allUsersFromTicket (cdticket: Array<number>, user: any) {
    let tickets = await this.ticketRepository.createQueryBuilder('ticket')
      .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
      .andWhere('ticket.cd in (:...cdticket)', { cdticket })
      .select(['ticket.cd', 'users.cd'])
      .getMany()
    if (!user.roles.find(it => it === 'tickets.others')) {
      for (const ticket of tickets) {
        if (!ticket.users.find(currUser => currUser.cd === user.cd)) {
          throw new ForbiddenException
        }
      }
    }

    return tickets
  }

  async removeKanbanCache (ticket: TicketEntity) {
    if (ticket._cdsituacao !== 4) {
      // this.redisCacheService.destroy('kanban')
    }
  } 

  async kanban (user: any) {
    // const cacheKanban = await this.redisCacheService.get('kanban')
    // if (cacheKanban) {
    //   return cacheKanban
    // }

    let qb = this.userRepository.createQueryBuilder('users')

    if (user.roles.find(it => it === 'tickets.others') == null) {
      qb.andWhere('users.cd = :cduser', { cduser: user.cd })
    }

    qb.leftJoinAndMapMany('users.tickets', 'users.tickets', 'tickets')
      .andWhere('tickets.cdsituacao != 4')
      .leftJoinAndMapOne('tickets.atendimento', 'tickets.cdatendimento', 'atendimento')
      .select(['users', 'tickets', 'atendimento'])

    /*
    qb.leftJoinAndMapMany('users.tickets', 'users.tickets', 'tickets')
      .leftJoinAndMapOne('tickets.situacao', 'tickets.cdsituacao', 'situacao')
      .andWhere('situacao.cd != 4')
      .leftJoinAndMapOne('tickets.solicitante', 'tickets.cdsolicitante', 'solicitante')
      .leftJoinAndMapMany('tickets.users', 'tickets.users', 'tusers')
      .leftJoinAndMapOne('solicitante.chave', 'solicitante.cdchave', 'chave')
      .leftJoinAndMapOne('tickets.urgencia', 'tickets.cdurgencia', 'urgencia')
      .leftJoinAndMapOne('tickets.atendimento', 'tickets.cdatendimento', 'atendimento')
      .leftJoinAndMapOne('atendimento.motivo', 'atendimento.cdmotivo', 'motivo')
      .andWhere('tickets.fgarquivado = false')
      .select(['users', 'tickets', 'tusers.cd','atendimento', 'motivo', 'chave', 'urgencia', 'solicitante'])
    */
    
    const result = await qb.getMany()
    // await this.redisCacheService.set('kanban', result)
    return result
  }

  async allFilterPaginate (dto: TicketFilterDTO, user: any) {
    const qb = this.allFilterQueryBuilder(dto, user)
    const skip = dto.options.itemsPerPage * (dto.options.page - 1)
    const take = dto.options.itemsPerPage

    if (dto.options?.sortBy?.length > 0) {
      const order = dto.options.sortDesc[0] ? 'DESC' : 'ASC'
      const mapSortBy = {
        'cd': 'ticket.cd',
        'dtcriacao': 'ticket.cd',
        'nmurgencia': 'ticket.cdurgencia',
        'nmsituacao': 'ticket.cdsituacao',
      }
      const sortBy = mapSortBy[dto.options.sortBy[0]]
      qb.orderBy(sortBy, order)
    } else {
      qb.orderBy('ticket.cd', 'DESC')
    }
    qb.skip(skip)
    qb.take(take)
    return await qb.getManyAndCount()
  } 

  async allFilter (data: TicketFilterDTO, user: any) {
    const qb = this.allFilterQueryBuilder(data, user)
    return await qb.getManyAndCount()
  }

  allFilterQueryBuilder (data: TicketFilterDTO, user: any) {
    let qb = this.ticketRepository.createQueryBuilder('ticket')
    qb.leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
    qb.leftJoinAndMapOne('ticket.situacao', 'ticket.cdsituacao', 'situacao')
    qb.leftJoinAndMapOne('ticket.atendimento', 'ticket.cdatendimento', 'atendimento')
    qb.leftJoinAndMapOne('ticket.urgencia', 'ticket.cdurgencia', 'urgencia')
    qb.leftJoinAndMapOne('atendimento.motivo', 'atendimento.cdmotivo', 'motivo')
    // qb.leftJoinAndMapMany('ticket.acoes', 'ticket.acoes', 'acoes', 'acoes.nmassunto is not NULL')
   
    if (data?.cd?.length > 0) {
      qb.andWhere('ticket.cd in (:...cd)', { cd: data.cd })
    }

    if (data?.dt0) {
      let dtinicio = moment.tz(`${data.dt0} 00:00`, 'America/Sao_Paulo').utc().format()
      let dtfim = moment.tz(`${data.dt1 ?? data.dt0} 23:59`, 'America/Sao_Paulo').utc().format()
      if (dtinicio > dtfim) {
        const temp = dtinicio
        dtinicio = dtfim
        dtfim = temp
      }
      qb.andWhere('ticket.dtcriacao >= :dtinicio AND ticket.dtcriacao <= :dtfim', { dtinicio, dtfim })
    }
    
    if (!user.roles.find(it => it === 'tickets.others')) {
      qb.andWhere('users.cd = :cduser', { cduser: user.cd })
    } else if (data.users?.length > 0) {
      qb.andWhere('users.cd in (:...userlist)', { userlist: data.users })
    }

    if (data?.motivo?.length > 0) {
      qb.andWhere('motivo.cd in (:...motivo)', { motivo: data.motivo })
    }

    if (data?.situacao?.length > 0) {
      qb.andWhere('situacao.cd in (:...situacao)', { situacao: data.situacao })
    }

    if (data?.fgticket?.length > 0) {
      qb.andWhere('ticket.fgticket in (:...fgticket)', { fgticket: data.fgticket })
    }

    if (data?.urgencia?.length > 0) {
      qb.andWhere('urgencia.cd in (:...urgencia)', { urgencia: data.urgencia })
    }

    if (data.chaves?.length > 0) {
      qb.andWhere('atendimento.cdchave in (:...chaves)', { chaves: data.chaves })
    }

    if (data.options?.searchPattern) {
      // qb.leftJoinAndMapOne('atendimento.user', 'atendimento.cduser', 'user')
      qb.andWhere(`(UPPER(nmtitulo) like UPPER(:pattern)
        OR UPPER(motivo.nmmotivo) like UPPER(:pattern)
        OR UPPER(situacao.nmsituacao) like UPPER(:pattern)
        OR UPPER(urgencia.nmurgencia) like UPPER(:pattern)
        OR UPPER(users.idlogin) like UPPER(:pattern)
        OR UPPER(users.idnome) like UPPER(:pattern))`,
        // OR UPPER(acoes.nmassunto) like UPPER(:pattern))`,
        // OR UPPER(acoes.mmdesc) like UPPER(:pattern))`,
        {
          pattern: `%${data.options.searchPattern}%`,
        }
      )
      const cdPattern = parseInt(data.options.searchPattern)
      if (cdPattern) {
        qb.orWhere('ticket.cd = :cdPattern', { cdPattern })
      }
    }

    qb.select(['ticket', 'atendimento' /*'acoes'*/])
    return qb
  }

  async addTicketAcao (data: any, user: any) {
    const ticket: TicketAddDTO = data.ticket
    const acao: AcaoAddDTO = data.acao
    let retTicket = null
    let retAcao = null
    await this.connection.transaction(async (manager : EntityManager) => {
      retTicket = await this.addTicket(ticket, acao, user, manager)
      acao.cdticket = retTicket.cd
      acao.cduser = user.cd
      acao.fgstatus = 1
      retAcao = await this.acaoService.addAcao(acao, user, manager, false)
      await this.atendimentoService.done({ cd: data.ticket.cdatendimento }, user, manager)
    })
    return {
      ticket: {...retTicket },
      acao: { ...retAcao },
    }
  }

  async addTicket (data: TicketAddDTO, acao: AcaoAddDTO, user: any, manager : EntityManager = null, emitAcao : Boolean = false) {
    let newTicket = null
    let oldTicket = null

    data.dtprevisao = moment.tz(data.dtprevisao, 'America/Sao_Paulo').utc().toDate()

    if (data.cdresponsavel != null && !data.users.includes(data.cdresponsavel)) {
      data.users.push(data.cdresponsavel)
    }

    const getTicket = async (cd) => {
      return await this.ticketRepository.findOneOrFail(cd, { relations: ['users', 'cdurgencia', 'cdsolicitante', 'cdsituacao', 'cdatendimento'] })
    }

    if (emitAcao) {
      oldTicket = await getTicket(data.cd)
    }

    const ticketEntity = new TicketEntity()
    if (acao !== null) {
      ticketEntity.nmtitulo = acao.nmassunto
    }
    ticketEntity.users = data.users.map(cduser => new UserEntity(cduser))
    delete data.users
    Object.assign(ticketEntity, data)
   
    let ticket = null


    if (manager) {
      ticket = await manager.save(ticketEntity)
      if (emitAcao) {
        await this.acaoService.addAcaoAfterTicketUpdate(oldTicket, ticket, user, manager)
      }
    } else {
      await this.connection.transaction(async (currManager : EntityManager) => {
        ticket = await currManager.save(ticketEntity)
        if (emitAcao) {
          newTicket = await getTicket(data.cd)
          await this.acaoService.addAcaoAfterTicketUpdate(oldTicket, ticket, user, currManager)
        }
      })
    }
    return {
      cd: ticket.cd,
    }
  }

  async allMeta () {
    try {
      const urgencia = await this.urgenciaRepository.find()
      const motivo = await this.motivoRepository.find()
      const situacao = await this.situacaoRepository.find()
      const origem = await this.origemRepository.find()

      return {
        urgencia,
        motivo,
        situacao,
        origem,
      }
    } catch (err) {
      throw new HttpException(
        err.sqlMessage,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async changeSituacao (data: ChangeSituacaoDTO, user : any, manager : EntityManager = null) {
    const qb = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
      .andWhere('ticket.cd = :cd', { cd: data.cd })

    if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
      qb.andWhere('users.cd = :cduser', { cduser: user.cd })
    }

    const ticket = await qb.getOne()

    if (!ticket || ticket.users.length === 0) {
      throw new ForbiddenException
    }

    if (ticket.cdsituacao !== data.cdsituacao) {
      delete ticket.users
      const ticketEntity = this.ticketRepository.create(ticket)
      for (const cduser in ticketEntity.jskanbanorder) {
        ticketEntity[cduser] = 0
      }
      ticketEntity.cdsituacao = data.cdsituacao
      await manager?.save(ticketEntity) || await this.ticketRepository.save(ticketEntity)
    }
  }

  async changeCdresponsavel (cdticket: number, cdresponsavel: number, user: any, manager : EntityManager = null) {
    const qb = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
      .andWhere('ticket.cd = :cd', { cd: cdticket })

    if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
      qb.andWhere('users.cd = :cduser', { cduser: user.cd })
    }

    const ticket = await qb.getOne()

    if (!ticket || !ticket.users.length) {
      throw new ForbiddenException
    }
    
    const newTicket = new TicketEntity()
    newTicket.users = ticket.users
    if (!ticket.users.find(currUser => currUser.cd === cdresponsavel)) {
      newTicket.users.push(new UserEntity(cdresponsavel))
    }

    if (ticket.cdresponsavel !== cdresponsavel) {
      newTicket.cd = cdticket
      newTicket.cdresponsavel = cdresponsavel
      await manager.save(newTicket)
    }
  }

  async updateKanbanOrder (data: any, user: any) {
    console.log(data)
    const ticketCdList : any = Object.keys(data)
    const qb = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndMapMany('ticket.users', 'ticket.users', 'users')
      .andWhere('ticket.cd in (:...ticketCdList)', { ticketCdList })
    if (user.roles.find(it => it === 'tickets.others.rewrite') == null) {
      qb.andWhere('users.cd = :cduser', { cduser: user.cd })
    }

    const tickets = await qb.getMany()
    if (!tickets || tickets.length === 0) {
      throw new ForbiddenException
    }

    for (const ticket of tickets) {
      for (const userCd in data[ticket.cd]) {
        ticket.jskanbanorder[userCd] = data[ticket.cd][userCd]
      }
      delete ticket.users
    }
    await this.ticketRepository.save(tickets)
  }
}
