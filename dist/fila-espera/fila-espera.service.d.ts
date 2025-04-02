import { Repository, Connection, EntityManager } from 'typeorm';
import { FilaEsperaEntity } from './fila-espera.entity';
import { FilaEsperaCreateDTO, FilaEsperaAllDTO } from './fila-espera.dto';
import { SolicitanteEntity } from 'src/chave/solicitante.entity';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
export declare class FilaEsperaService {
    private filaEsperaRepository;
    private solicitanteRepository;
    private websocketGateway;
    private readonly connection;
    constructor(filaEsperaRepository: Repository<FilaEsperaEntity>, solicitanteRepository: Repository<SolicitanteEntity>, websocketGateway: WebsocketGateway, connection: Connection);
    add(data: FilaEsperaCreateDTO, user: any): Promise<FilaEsperaEntity>;
    delete(cd: number, user: any): Promise<void>;
    allOnline(): Promise<FilaEsperaEntity[]>;
    all(allDTO: FilaEsperaAllDTO): Promise<FilaEsperaEntity[]>;
    close(cd: number, cdatendimento: number, user: any, manager?: EntityManager): Promise<void>;
}
