import { UrgenciaEntity } from './urgencia.entity';
import { Repository, Connection, EntityManager, SelectQueryBuilder } from 'typeorm';
import { SituacaoEntity } from './situacao.entity';
import { SolicitanteEntity } from 'src/chave/solicitante.entity';
import { TicketAddDTO, AcaoAddDTO, ChangeSituacaoDTO, TicketFilterDTO } from './ticket.dto';
import { TicketEntity } from './ticket.entity';
import { UserEntity } from 'src/user/user.entity';
import { AcaoEntity } from './acao.entity';
import { AtendimentoService } from 'src/atendimento/atendimento.service';
import { MotivoEntity } from 'src/atendimento/motivo.entity';
import { AcaoService } from './acao.service';
import { ChaveEntity } from 'src/chave/chave.entity';
import { OrigemEntity } from 'src/atendimento/origem.entity';
export declare class TicketService {
    private acaoService;
    private atendimentoService;
    private ticketRepository;
    private urgenciaRepository;
    private motivoRepository;
    private situacaoRepository;
    private origemRepository;
    private solicitanteRepository;
    private userRepository;
    private acaoRepository;
    private chaveRepository;
    private readonly connection;
    constructor(acaoService: AcaoService, atendimentoService: AtendimentoService, ticketRepository: Repository<TicketEntity>, urgenciaRepository: Repository<UrgenciaEntity>, motivoRepository: Repository<MotivoEntity>, situacaoRepository: Repository<SituacaoEntity>, origemRepository: Repository<OrigemEntity>, solicitanteRepository: Repository<SolicitanteEntity>, userRepository: Repository<UserEntity>, acaoRepository: Repository<AcaoEntity>, chaveRepository: Repository<ChaveEntity>, connection: Connection);
    getTicket(user: any, cd: number): Promise<TicketEntity>;
    allUsersFromTicket(cdticket: Array<number>, user: any): Promise<TicketEntity[]>;
    removeKanbanCache(ticket: TicketEntity): Promise<void>;
    kanban(user: any): Promise<UserEntity[]>;
    allFilterPaginate(dto: TicketFilterDTO, user: any): Promise<[TicketEntity[], number]>;
    allFilter(data: TicketFilterDTO, user: any): Promise<[TicketEntity[], number]>;
    allFilterQueryBuilder(data: TicketFilterDTO, user: any): SelectQueryBuilder<TicketEntity>;
    addTicketAcao(data: any, user: any): Promise<{
        ticket: any;
        acao: any;
    }>;
    addTicket(data: TicketAddDTO, acao: AcaoAddDTO, user: any, manager?: EntityManager, emitAcao?: Boolean): Promise<{
        cd: any;
    }>;
    allMeta(): Promise<{
        urgencia: UrgenciaEntity[];
        motivo: MotivoEntity[];
        situacao: SituacaoEntity[];
        origem: OrigemEntity[];
    }>;
    changeSituacao(data: ChangeSituacaoDTO, user: any, manager?: EntityManager): Promise<void>;
    changeCdresponsavel(cdticket: number, cdresponsavel: number, user: any, manager?: EntityManager): Promise<void>;
    updateKanbanOrder(data: any, user: any): Promise<void>;
}
