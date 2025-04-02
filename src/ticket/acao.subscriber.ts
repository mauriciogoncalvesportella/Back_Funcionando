import {EntitySubscriberInterface, Repository, InsertEvent, EventSubscriber, Connection, UpdateEvent} from "typeorm";
import {TicketEntity} from "./ticket.entity";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "src/user/user.entity";
import {Logger} from "@nestjs/common";
import {AcaoService} from "./acao.service";
import {AcaoEntity} from "./acao.entity";
import {ServicoEntity} from "./servico.entity";

@EventSubscriber()
export class AcaoSubscriber implements EntitySubscriberInterface<AcaoEntity> {
  constructor(
    @InjectConnection()
    private connection: Connection,

    @InjectRepository(ServicoEntity)
    private servicoRepository: Repository<ServicoEntity>,
  ) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return AcaoEntity
  }

  async beforeInsert (event: InsertEvent<AcaoEntity>) {
    /*
    const acao : AcaoEntity = event.entity
    if (acao.fgstatus === 0) {
      let servico = new ServicoEntity()
      servico.cduser = acao.cduser
      servico = await event.manager.save(servico)
      acao.cdservico = servico.cd
    }
    */
  }
}
