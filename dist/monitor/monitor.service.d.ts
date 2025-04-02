import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import { Repository, EntityManager } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AcaoEntity } from 'src/ticket/acao.entity';
export declare class MonitorService {
    private atendimentoRepository;
    private acaoRepository;
    private userRepository;
    constructor(atendimentoRepository: Repository<AtendimentoEntity>, acaoRepository: Repository<AcaoEntity>, userRepository: Repository<UserEntity>);
    removeMonitorCache(atendimento?: AtendimentoEntity, force?: boolean): Promise<void>;
    monitor(date: string, user: any): Promise<{
        userAtendimentos: UserEntity[];
        acoes: AcaoEntity[];
    }>;
    allAcaoService(dtinicio: string, dtfim: string, manager: EntityManager): Promise<AcaoEntity[]>;
}
