import { ServicoEntity } from './servico.entity';
import { Repository, Connection, EntityManager } from 'typeorm';
export declare class ServicoService {
    private servicoRepository;
    private readonly connection;
    constructor(servicoRepository: Repository<ServicoEntity>, connection: Connection);
    start(user: any, cdStart: any, currManager?: EntityManager): Promise<void>;
    stopAll(user: any, currManager?: EntityManager): Promise<void>;
    close(user: any, cdservico: number, manager: EntityManager): Promise<number>;
    private stopStart;
}
