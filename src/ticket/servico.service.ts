import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import {InjectRepository, InjectConnection} from '@nestjs/typeorm';
import {ServicoEntity, PeriodoServico} from './servico.entity';
import {Repository, Connection, EntityManager} from 'typeorm';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(ServicoEntity)
    private servicoRepository: Repository<ServicoEntity>,
  
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async start (user, cdStart, currManager : EntityManager = null) {
    const manager = currManager || this.connection.manager
    await this.stopStart(user, cdStart, manager)
  }

  async stopAll (user, currManager : EntityManager = null) {
    const manager = currManager || this.connection.manager
    await this.stopStart(user, -1, manager)
  }

  async close (user, cdservico : number, manager: EntityManager): Promise<number> {
    await this.stopAll(user, manager)
    const servico = await manager.findOneOrFail(ServicoEntity, cdservico)
    if (servico._cduser != user.cd && !user.roles.includes('tickets.others.rewrite')) {
      throw new ForbiddenException
    }
    if (servico.jslista?.length) {
      const dtfim = new Date()
      const lastPeriod = servico.jslista[servico.jslista.length - 1]
      lastPeriod.dtfim = dtfim
      servico.dtfim = dtfim
      servico.ntotal = servico.jslista.reduce((acc, curr) => acc + (new Date(curr.dtfim).getTime() - new Date(curr.dtinicio).getTime()), 0)
      manager.save(ServicoEntity, servico)
      return servico.ntotal 
    }
    return 0
  }

  private async stopStart (user,  cdStart : number = -1, currManager : EntityManager = null) {
    let manager = currManager || this.connection.manager
    const servicos = await manager
      .createQueryBuilder(ServicoEntity, 'servico')
      .andWhere('servico.cduser = :cduser AND servico.dtfim is NULL', { cduser: user.cd })
      .getMany()

    let checkSave = false
    const dtfim = new Date()
    for (const servico of servicos) {
      if (servico.cd !== cdStart && servico.jslista?.length > 0) {
        const lastPeriod = servico.jslista.slice(-1)[0]
        if (lastPeriod.dtfim == null) {
          checkSave = true
          lastPeriod.dtfim = dtfim
        }
      } else if (servico.cd === cdStart) {
        servico.jslista = servico.jslista || []
        if (servico.jslista.length === 0 || servico.jslista[servico.jslista.length - 1].dtfim != null) {
          checkSave = true
          servico.jslista.push({
            dtinicio: new Date(),
            dtfim: null,
          })
        }
      }
    }

    if (checkSave) {
      await manager.save(servicos)
    }
  }
}
