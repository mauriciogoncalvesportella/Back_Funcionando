import {EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectConnection} from "@nestjs/typeorm";

@EventSubscriber()
export class EventoSubscriber implements EntitySubscriberInterface<EventoEntity> {
  constructor (
    @InjectConnection()
    private connection: Connection,
  ) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return EventoEntity
  }

  async beforeInsert (evento: InsertEvent<EventoEntity>) {
    if (evento.entity.fgrecorrente) {
      evento.entity.dtinicio = null
      evento.entity.dtfim = null
      evento.entity.dtrealizadoinicio = null
      evento.entity.dtrealizadofim = null
    }
  }
}
