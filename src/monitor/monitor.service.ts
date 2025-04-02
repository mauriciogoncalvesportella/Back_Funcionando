import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import { Repository, EntityManager, Brackets } from 'typeorm';
import {UserEntity} from 'src/user/user.entity';
import * as moment from 'moment-timezone'
import {AcaoEntity} from 'src/ticket/acao.entity';
import {utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz'
import {format} from 'date-fns';
import {TicketEntity} from 'src/ticket/ticket.entity';
@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(AtendimentoEntity)
    private atendimentoRepository: Repository<AtendimentoEntity>,

    @InjectRepository(AcaoEntity)
    private acaoRepository: Repository<AcaoEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  async removeMonitorCache (atendimento?: AtendimentoEntity, force: boolean = false) {
    if (force) {
      // await this.redisCacheService.destroy('monitor')
      return
    }

    const todayStr: string = format(new Date(), 'yyyy-MM-dd')
    const dtcriacao: string = format(atendimento.dtcriacao, 'yyyy-MM-dd')
    if (todayStr === dtcriacao) {
      // await this.redisCacheService.destroy('monitor')
    }
  }
  
  async monitor (date : string, user: any) {
    const todayStr: string = format(utcToZonedTime(new Date(), 'America/Sao_Paulo'), 'yyyy-MM-dd')
    let isToday: boolean = false

    // if (todayStr === date) {
    //   isToday = true
    //   const cache = await this.redisCacheService.get('monitor')
    //   if (cache) {
    //     return cache
    //   }
    // }

    const dtinicio = moment.tz(`${date} 00:00`, 'America/Sao_Paulo').utc().format()
    const dtfim = moment.tz(`${date} 23:59`, 'America/Sao_Paulo').utc().format()
    const filters = {
      dtinicio,
      dtfim
    }

    const qbAcoes = this.acaoRepository.createQueryBuilder('acao')
      .leftJoinAndMapOne('acao.servico', 'acao.cdservico', 'servico')
      .leftJoinAndMapOne('acao.ticket', 'acao.cdticket', 'ticket')
      .leftJoinAndMapOne('ticket.atendimento', 'ticket.cdatendimento', 'atendimento')
      .where("servico.dtinicio >= :dtinicio")
      //.andWhere("(servico.dtfim < :dtfim")
      .andWhere(new Brackets(qb => {
        qb.andWhere("servico.dtfim < :dtfim", { dtfim: filters.dtfim })
          .orWhere("servico.dtfim is null")
      }))
      .setParameters(filters)

    const qbUserAtendimentos = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapMany('user.atendimentos', 'user.atendimentos', 'atendimento')
      .leftJoinAndMapOne("atendimento.chave", "atendimento.cdchave", "chave")
      .leftJoinAndMapOne("atendimento.ticket", "atendimento.cdticket", "ticket")
      .leftJoinAndMapOne("atendimento.motivo", "atendimento.cdmotivo", "motivo")
      .leftJoinAndMapOne("atendimento.origem", "atendimento.cdorigem", "origem")
      .where("atendimento.dtinicio >= :dtinicio")
      .andWhere("atendimento.dtinicio < :dtfim ")
      .setParameters(filters)
    
    if (!user.roles.find(it => it === 'monitor.all')) {
      qbUserAtendimentos.andWhere("user.cd = :cduser", { cduser: user.cd })
      qbAcoes.andWhere('acao.cduser = :cduser', { cduser: user.cd })
    }

    const userAtendimentos = await qbUserAtendimentos.select(['user', 'atendimento', 'chave.idfantasia', 'origem', 'chave.cd', 'user.idlogin', 'user.cd', 'motivo.nmmotivo']).getMany();
    const acoes = await qbAcoes.select(['acao', 'servico', 'ticket', 'atendimento']).getMany();
    const ret = {
      userAtendimentos,
      acoes,
    }

    // if (isToday) {
    //   await this.redisCacheService.set('monitor', ret)
    // }

    return ret
  }

  async allAcaoService (dtinicio: string, dtfim: string, manager: EntityManager) {
    return await manager.createQueryBuilder(AcaoEntity, 'acao')
      .leftJoinAndMapOne('acao.servico', 'acao.cdservico', 'servico')
      .andWhere("servico.dtinicio >= :dtinicio")
      .andWhere("servico.dtfim < :dtfim")
      .setParameters({ dtinicio, dtfim })
      .getMany()
  }
}
