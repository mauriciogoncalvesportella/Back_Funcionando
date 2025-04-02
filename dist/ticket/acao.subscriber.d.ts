import { EntitySubscriberInterface, Repository, InsertEvent, Connection } from "typeorm";
import { AcaoEntity } from "./acao.entity";
import { ServicoEntity } from "./servico.entity";
export declare class AcaoSubscriber implements EntitySubscriberInterface<AcaoEntity> {
    private connection;
    private servicoRepository;
    constructor(connection: Connection, servicoRepository: Repository<ServicoEntity>);
    listenTo(): typeof AcaoEntity;
    beforeInsert(event: InsertEvent<AcaoEntity>): Promise<void>;
}
