import { EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
import { EventoEntity } from "./evento.entity";
export declare class EventoSubscriber implements EntitySubscriberInterface<EventoEntity> {
    private connection;
    constructor(connection: Connection);
    listenTo(): typeof EventoEntity;
    beforeInsert(evento: InsertEvent<EventoEntity>): Promise<void>;
}
