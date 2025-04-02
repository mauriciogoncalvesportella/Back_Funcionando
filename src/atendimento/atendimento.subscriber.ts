import {EntitySubscriberInterface, InsertEvent, EventSubscriber, Connection, UpdateEvent} from "typeorm";
import {InjectConnection } from "@nestjs/typeorm";
import {AtendimentoEntity} from "./atendimento.entity";
import {MonitorService} from "src/monitor/monitor.service";
import {Logger} from "@nestjs/common";

@EventSubscriber()
export class AtendimentoSubscriber implements EntitySubscriberInterface<AtendimentoEntity> {
  constructor(
    @InjectConnection()
    private connection: Connection,
    private monitorService: MonitorService,
  ) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return AtendimentoEntity
  }

  async afterInsert (event: InsertEvent<AtendimentoEntity>) {
    this.monitorService.removeMonitorCache(event.entity)
  }

  async beforeUpdate(event: UpdateEvent<AtendimentoEntity>) {
    this.monitorService.removeMonitorCache(event.entity as AtendimentoEntity)
  }
}
