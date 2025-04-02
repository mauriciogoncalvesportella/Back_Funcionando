import {EntitySubscriberInterface, Repository, InsertEvent, EventSubscriber, Connection, UpdateEvent} from "typeorm";
import {TicketEntity} from "./ticket.entity";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "src/user/user.entity";
import {Logger} from "@nestjs/common";
import {AcaoService} from "./acao.service";
import {SituacaoEntity} from "./situacao.entity";
import {TicketService} from "./ticket.service";

@EventSubscriber()
export class TicketSubscriber implements EntitySubscriberInterface<TicketEntity> {
  constructor(
    @InjectConnection()
    private connection: Connection,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(SituacaoEntity)
    private situacaoRepository: Repository<SituacaoEntity>,

    private ticketService: TicketService,
  ) {
    connection.subscribers.push(this)
  }

  listenTo () {
    return TicketEntity
  }

  async beforeInsert (ticket: InsertEvent<TicketEntity>) {
    const userTicketLength = {}
    const cdFinalizado= (await this.situacaoRepository.findOneOrFail({ nmsituacao: 'Finalizado' })).cd

    if (ticket.entity.cdsituacao !== cdFinalizado) {
      const users = ticket.entity.users.map(it => {
        userTicketLength[it.cd] = 0
        return it.cd
      })

      const qb = await this.userRepository.createQueryBuilder('user')
        .andWhere('user.cd in (:...users)', { users })
        .leftJoinAndMapMany('user.tickets', 'user.tickets', 'ticket')
        .andWhere('ticket.cdsituacao = :cdsituacao', { cdsituacao: ticket.entity.cdsituacao })
        .getMany()
      
      for (const user of qb) {
        userTicketLength[user.cd] = user.tickets.length
      }
      ticket.entity.jskanbanorder = userTicketLength
    }

    if (ticket.entity.cdurgencia == null) {
      ticket.entity.dtprevisao = null
    }
  }

  async afterInsert(event: InsertEvent<TicketEntity>) {
    this.ticketService.removeKanbanCache(event.entity)
  } 

  async afterUpdate(event: UpdateEvent<TicketEntity>) {
    this.ticketService.removeKanbanCache(event.entity as TicketEntity)
  }
}
