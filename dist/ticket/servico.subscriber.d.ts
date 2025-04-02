import { EntitySubscriberInterface, InsertEvent, Connection, UpdateEvent } from "typeorm";
import { ServicoEntity } from "./servico.entity";
import { MonitorService } from "src/monitor/monitor.service";
export declare class ServicoSubscriber implements EntitySubscriberInterface<ServicoEntity> {
    private connection;
    private monitorService;
    constructor(connection: Connection, monitorService: MonitorService);
    listenTo(): typeof ServicoEntity;
    beforeInsert(event: InsertEvent<ServicoEntity>): Promise<void>;
    beforeUpdate(event: UpdateEvent<ServicoEntity>): Promise<void>;
}
