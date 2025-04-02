import {EntitySubscriberInterface, Repository, InsertEvent, EventSubscriber, Connection, UpdateEvent} from "typeorm";
import {TicketEntity} from "./ticket.entity";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "src/user/user.entity";
import {Logger} from "@nestjs/common";
import {AcaoService} from "./acao.service";
import {AcaoEntity} from "./acao.entity";
import {ServicoEntity} from "./servico.entity";
import {MonitorService} from "src/monitor/monitor.service";
import {AtendimentoEntity} from "src/atendimento/atendimento.entity";

@EventSubscriber()
export class ServicoSubscriber implements EntitySubscriberInterface<ServicoEntity> {
  constructor(
    @InjectConnection()
    private connection: Connection,
    private monitorService: MonitorService
  ) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return ServicoEntity
  }

  async beforeInsert (event: InsertEvent<ServicoEntity>) {
    event.entity.dtinicio = new Date()
  }

  async beforeUpdate (event: UpdateEvent<ServicoEntity>) {
    const atendimento: AtendimentoEntity = new AtendimentoEntity()
    atendimento.dtcriacao = event.entity.dtinicio
    this.monitorService.removeMonitorCache(undefined, true)
  }
}
