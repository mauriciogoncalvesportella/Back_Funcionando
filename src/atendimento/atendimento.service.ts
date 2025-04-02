import { Injectable, HttpException, HttpStatus, Logger, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { AtendimentoEntity } from './atendimento.entity';
import { Repository, Timestamp, EntityManager, Connection } from 'typeorm';
import { AtendimentoAddDTO, AtendimentoUpdateDTO, AtendimentoStopStartDTO, AtendimentoChangeMotivoDTO, OrigemAddDTO } from './atendimento.dto';
import { ChaveEntity } from 'src/chave/chave.entity';
import {MotivoEntity} from './motivo.entity';
import * as moment from 'moment-timezone'
import {ForbiddenError} from 'src/shared/db.filter';
import {OrigemEntity} from './origem.entity';
import {FilaEsperaEntity} from 'src/fila-espera/fila-espera.entity';
import {FilaEsperaService} from 'src/fila-espera/fila-espera.service';
import {WebsocketGateway} from 'src/websocket/websocket.gateway';
import {MonitorService} from 'src/monitor/monitor.service';

@Injectable()
export class AtendimentoService {
  constructor(
    @InjectRepository(AtendimentoEntity)
    private atendimentoRepository: Repository<AtendimentoEntity>,

    @InjectRepository(MotivoEntity)
    private motivoRepository: Repository<MotivoEntity>,
    
    @InjectRepository(ChaveEntity)
    private chaveRepository: Repository<ChaveEntity>,

    @InjectRepository(OrigemEntity)
    private origemRepository: Repository<OrigemEntity>,

    @InjectRepository(FilaEsperaEntity)
    private filaEsperaRepository: Repository<FilaEsperaEntity>,
    
    @InjectConnection()
    private readonly connection: Connection,

    private readonly filaEsperaService: FilaEsperaService, 

    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async RefreshState () {
    this.atendimentoRepository.find();
  }

  async add (data: AtendimentoAddDTO, user) {
    if (!data.cdchave && !data.cdfila) {
      throw new HttpException(
        'Invalid Request',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (data.cdfila) {
      var filaEntity: FilaEsperaEntity = await this.filaEsperaRepository.findOneOrFail(data.cdfila) 
      data.cdchave = filaEntity._cdchave
    }
    const dtinicio = new Date().toString()
    const cduser = user.cd
    let atendimentoEntity: AtendimentoEntity = null

    this.connection.transaction(async (manager: EntityManager) => {
      atendimentoEntity = manager.create(AtendimentoEntity, { ...data, dtinicio, cduser })
      atendimentoEntity.cdfila = data.cdfila ?? null
      await manager.save(atendimentoEntity)
      if (data.cdfila != null) {
        await this.filaEsperaService.close(data.cdfila, atendimentoEntity.cd, user, manager)
      }
    })
    return atendimentoEntity
  }

  async getOnline (manager: EntityManager = this.connection.manager) {
    const today = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD')
    const dtinicio = moment.tz(`${today} 00:00`, 'America/Sao_Paulo').utc().format()
    const dtfim = moment.tz(`${today} 23:59`, 'America/Sao_Paulo').utc().format()
    return await manager
      .createQueryBuilder(AtendimentoEntity, 'atendimento')
      .andWhere('atendimento.dtfim is NULL')
      .andWhere('atendimento.fgativo = TRUE')
      // .andWhere('atendimento.dtinicio >= :dtinicio AND atendimento.dtinicio <= :dtfim', { dtinicio, dtfim })
      .getMany()
  }

  async stopStart (data: AtendimentoStopStartDTO, user, manager : EntityManager = this.connection.manager) {
    const atendimentos = await manager
      .createQueryBuilder(AtendimentoEntity, 'atendimento')
      .andWhere('atendimento.cduser = :cduser AND atendimento.dtfim is NULL', { cduser: user.cd })
      .getMany()

    let atendimentoToStart : AtendimentoEntity;
    let atendimentoClosed: boolean = false

    for (const atendimento of atendimentos) {
      if (atendimento.cd === data.cdatendimento) {
        atendimentoToStart = atendimento
      } else {
        atendimento.fgativo = false
      }

      const jslista = atendimento?.jslista
      if (jslista != null && jslista.length > 0 && jslista[jslista.length - 1].dtfim == null) {
        atendimentoClosed = true
        const dtfim = new Date()
        const dtinicio = new Date(jslista[jslista.length - 1].dtinicio).getTime()
        if (dtfim.getTime() - dtinicio > 5e3) {
          jslista[jslista.length - 1].dtfim = dtfim
        } else {
          jslista.pop()
          if (jslista.length === 0) {
            atendimento.jslista = null 
          }
        }
      }
    }
    
    if (data.cdatendimento !== -1 && atendimentoToStart) {
      atendimentoToStart.fgativo = true
      atendimentoToStart.jslista = atendimentoToStart.jslista || []
      atendimentoToStart.jslista.push({
        dtinicio: new Date(),
        dtfim: null
      })
    }

    if (atendimentoToStart || atendimentoClosed) {
      this.websocketGateway.notifyRoom('AtendimentosOnline', 'update', atendimentoToStart ?? { sleep: true, cduser: user.cd })
    }

    await manager.save(AtendimentoEntity, atendimentos)
  }

  async all (user) {
    let dtinicio = moment.tz(new Date(), 'America/Sao_Paulo')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    try {
      return await this.atendimentoRepository
                   .createQueryBuilder("atendimento")
                   .leftJoinAndMapOne("atendimento.chave", "atendimento.cdchave", "chave")
                   .leftJoinAndMapOne("atendimento.origem", "atendimento.cdorigem", "origem")
                   .leftJoinAndMapOne("atendimento.fila", "atendimento.cdfila", "fila")
                   .leftJoinAndMapOne("fila.solicitante", "fila.cdsolicitante", "solicitante")
                   // .where("atendimento.cduser = :cduser AND atendimento.dtinicio > :dtinicio", { cduser: user.cd, dtinicio: dtinicio.toISOString() })
                   .where("atendimento.cduser = :cduser", { cduser: user.cd })
                   .andWhere("atendimento.dtfim is NULL")
                   .orderBy("atendimento.dtinicio", "ASC")
                   .select(["atendimento", "chave.idfantasia", "chave.cd", "origem", "fila", "solicitante"])
                   .getMany()
    } catch (err) {
      throw new HttpException(
        err.sqlMessage,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async allAdmin (data, user) {
    let qb = this.atendimentoRepository.createQueryBuilder('atendimento')
                 .leftJoinAndMapOne('atendimento.chave', 'atendimento.cdchave', 'chave')
                 .leftJoinAndMapOne('atendimento.user', 'atendimento.cduser', 'user')
                 .leftJoinAndMapOne('atendimento.origem', 'atendimento.cdorigem', 'origem')
    if (data.atendimentos?.length > 0) {
      qb.andWhere('atendimento.cd IN (:...atendimentos)', { atendimentos: data.atendimentos })
    }

    if (data.notNull) {
      for (const parameter of data.notNull) {
        qb.andWhere(`atendimento.${parameter} is not NULL`)
      }
    }

    if (user.roles.find(it => it === 'atendimento.others')) {
      if (data.users?.length > 0 && data.users[0] != -1)
        qb = qb.andWhere(`atendimento.cduser IN (:...users)`, { users: data.users })
    } else {
      qb = qb.andWhere(`atendimento.cduser = :user`, { user: user.cd })
    }

    if (data.clientes?.length > 0) 
      qb = qb.andWhere('atendimento.cdchave IN (:...clientes)', {clientes: data.clientes })

    if (data.dtinicio) {
      const dtinicio = moment.tz(data.dtinicio, 'America/Sao_Paulo').utc().format()
      qb = qb.andWhere(`atendimento.dtinicio >= :dtinicio`, { dtinicio: dtinicio})
    }

    if (data.dtfim) {
      const dtfim = moment.tz(data.dtfim, 'America/Sao_Paulo').utc().format()
      qb = qb.andWhere(`atendimento.dtinicio <= :dtfim`, { dtfim: dtfim })
    }

    qb = qb.orderBy('atendimento.dtinicio', 'ASC')
    return await qb.select(['atendimento', 'chave.idfantasia', 'origem', 'chave.cd', 'user.idlogin']).getMany()
  }

  async update (data : AtendimentoUpdateDTO) {
    try {
      let item = await this.atendimentoRepository.findOneOrFail({ where: {cd: data.cd} })
      const dtinicio = data.dtinicio || item.dtinicio
      
      if (data.dtfim) {
        if (data.dtfim < dtinicio) {
          throw new HttpException(
            'Horário final inválido',
            HttpStatus.BAD_REQUEST,
          )
        }
      }
      if (data.dtinicio)
        item.dtinicio = new Date(data.dtinicio)
      if (data.dtfim && (data.done || item.dtfim))
        item.dtfim = new Date(data.dtfim)
      if (data.cdchave)
        item.cdchave = data.cdchave
      if (data.jslista)
        item.jslista = data.jslista 

      await this.atendimentoRepository.save(item)
    } catch (err) {
      throw new HttpException(
        err.sqlMessage,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changeMotivo (data: AtendimentoChangeMotivoDTO, user, manager : EntityManager = null) {
    let atendimento = await this.atendimentoRepository.findOneOrFail(data.cdatendimento)
    if (!atendimento.cdticket) {
      atendimento.cdmotivo = data.cdmotivo
      await manager?.save(atendimento) || this.atendimentoRepository.save(atendimento)
      return
    }
    throw new BadRequestException
  }

  async done (data, user, manager : EntityManager = null) {
    let atendimento = await this.atendimentoRepository.findOneOrFail({ cd: data.cd, cduser: user.cd });
    const dtfim = new Date()

    atendimento.dtfim = dtfim
    const jslista = atendimento.jslista
    if (jslista != null && jslista[jslista.length - 1].dtfim == null) {
      atendimento.jslista[jslista.length - 1].dtfim = dtfim
    }
    await manager?.save(atendimento) || await this.atendimentoRepository.save(atendimento)
  }

  async destroy (cd : number) {
    this.atendimentoRepository.delete(cd)
  }
}
