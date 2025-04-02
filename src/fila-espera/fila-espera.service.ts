import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager, Equal, Between } from 'typeorm';
import { FilaEsperaEntity } from './fila-espera.entity';
import { FilaEsperaCreateDTO, FilaEsperaAllDTO } from './fila-espera.dto';
import {SolicitanteEntity} from 'src/chave/solicitante.entity';
import { omitBy, isNil } from 'lodash'
import * as moment from 'moment-timezone'
import {WebsocketGateway} from 'src/websocket/websocket.gateway';

@Injectable()
export class FilaEsperaService {
  constructor(
    @InjectRepository(FilaEsperaEntity)
    private filaEsperaRepository: Repository<FilaEsperaEntity>,

    @InjectRepository(SolicitanteEntity)
    private solicitanteRepository: Repository<SolicitanteEntity>,

    private websocketGateway: WebsocketGateway, 

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async add (data: FilaEsperaCreateDTO, user: any): Promise<FilaEsperaEntity> {
    let entity: FilaEsperaEntity = this.filaEsperaRepository.create(data)
    const ret: any = await entity.saveAndReload()
    ret.cdsolicitante = await this.solicitanteRepository.findOneOrFail(ret.cdsolicitante)
    this.websocketGateway.notifyRoom('FilaEspera', 'add', ret, user.cd)
    return ret
  }

  async delete (cd: number, user: any): Promise<void> {
    await this.filaEsperaRepository.delete(cd)
    this.websocketGateway.notifyRoom('FilaEspera', 'remove', cd, user.cd)
  }

  async allOnline (): Promise<FilaEsperaEntity[]> {
    return await this.filaEsperaRepository.find({
      where: {
        fgstatus: 0,
      },
      order: {
        fgurgente: 'DESC',
        cd: 'ASC',
      },
      relations: ['cdsolicitante'],
    })
  }

  async all (allDTO: FilaEsperaAllDTO): Promise<FilaEsperaEntity[]> {
    let dtinicio: string
    let dtfim: string
    if (allDTO.date) {
      dtinicio = moment.tz(`${allDTO.date} 00:00`, 'America/Sao_Paulo').utc().format()
      dtfim = moment.tz(`${allDTO.date} 23:59`, 'America/Sao_Paulo').utc().format()
    }
    return await this.filaEsperaRepository.find({
      skip: allDTO.skip,
      take: allDTO.take,
      relations: ['cdsolicitante', 'cdatendimento'],
      where: omitBy({
        cdchave: allDTO.cdchave,
        cdsolicitante: allDTO.cdsolicitante,
        dtcriacao: allDTO.date ? Between(dtinicio, dtfim) : null,
      }, isNil),
      order: {
        cd: 'DESC',
      },
    })
  }

  async close (cd: number, cdatendimento: number, user: any, manager: EntityManager = this.connection.manager): Promise<void> {
    const entity = await manager.findOneOrFail(FilaEsperaEntity, cd)
    entity.fgstatus = 1
    entity.dtfinalizado = new Date()
    entity.cdatendimento = cdatendimento
    await manager.save(entity)
    this.websocketGateway.notifyRoom('FilaEspera', 'remove', cd, user.cd)
  }
}
