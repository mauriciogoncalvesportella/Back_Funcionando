import { EntitySubscriberInterface, InsertEvent, Connection, UpdateEvent } from "typeorm";
import { AtendimentoEntity } from "./atendimento.entity";
import { MonitorService } from "src/monitor/monitor.service";
export declare class AtendimentoSubscriber implements EntitySubscriberInterface<AtendimentoEntity> {
    private connection;
    private monitorService;
    constructor(connection: Connection, monitorService: MonitorService);
    listenTo(): typeof AtendimentoEntity;
    afterInsert(event: InsertEvent<AtendimentoEntity>): Promise<void>;
    beforeUpdate(event: UpdateEvent<AtendimentoEntity>): Promise<void>;
}
