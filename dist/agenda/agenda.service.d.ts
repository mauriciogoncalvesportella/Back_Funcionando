import { EventoEntity } from './evento.entity';
import { Repository, Connection, EntityManager } from 'typeorm';
import { EventoAddDTO, EventoUpdateDTO, EventoDuplicarDTO, EventoFixarDTO } from './agenda.dto';
export declare class AgendaService {
    private eventoRepository;
    private readonly connection;
    constructor(eventoRepository: Repository<EventoEntity>, connection: Connection);
    all(dtinicio: string, dtfim: string, user: any, userTarget?: number): Promise<EventoEntity[]>;
    fixarEvento(dto: EventoFixarDTO, user: any): Promise<void>;
    deleteEvento(cd: number, user: any): Promise<void>;
    duplicarEvento(dto: EventoDuplicarDTO, user: any): Promise<void>;
    addOrUpdateEvent(eventoDto: EventoUpdateDTO | EventoAddDTO, user: any, operation: 'add' | 'update', manager?: EntityManager): Promise<EventoEntity>;
}
