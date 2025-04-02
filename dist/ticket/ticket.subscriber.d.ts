import { EntitySubscriberInterface, Repository, InsertEvent, Connection, UpdateEvent } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "src/user/user.entity";
import { SituacaoEntity } from "./situacao.entity";
import { TicketService } from "./ticket.service";
export declare class TicketSubscriber implements EntitySubscriberInterface<TicketEntity> {
    private connection;
    private userRepository;
    private situacaoRepository;
    private ticketService;
    constructor(connection: Connection, userRepository: Repository<UserEntity>, situacaoRepository: Repository<SituacaoEntity>, ticketService: TicketService);
    listenTo(): typeof TicketEntity;
    beforeInsert(ticket: InsertEvent<TicketEntity>): Promise<void>;
    afterInsert(event: InsertEvent<TicketEntity>): Promise<void>;
    afterUpdate(event: UpdateEvent<TicketEntity>): Promise<void>;
}
