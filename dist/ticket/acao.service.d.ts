import { AcaoEntity } from "./acao.entity";
import { Repository, EntityManager, Connection } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { SolicitanteEntity } from "src/chave/solicitante.entity";
import { UrgenciaEntity } from "./urgencia.entity";
import { UserEntity } from "src/user/user.entity";
import { AcaoAddDTO } from "./ticket.dto";
import { TicketService } from "./ticket.service";
import { ServicoEntity } from "./servico.entity";
import { ServicoService } from "./servico.service";
import { AtendimentoService } from "src/atendimento/atendimento.service";
export declare class AcaoService {
    private atendimentoService;
    private servicoService;
    private ticketService;
    private acaoRepository;
    private servicoRepository;
    private solicitanteRepository;
    private urgenciaRepository;
    private userRepository;
    private ticketRepository;
    private readonly connection;
    constructor(atendimentoService: AtendimentoService, servicoService: ServicoService, ticketService: TicketService, acaoRepository: Repository<AcaoEntity>, servicoRepository: Repository<ServicoEntity>, solicitanteRepository: Repository<SolicitanteEntity>, urgenciaRepository: Repository<UrgenciaEntity>, userRepository: Repository<UserEntity>, ticketRepository: Repository<TicketEntity>, connection: Connection);
    getAcao(cdacao: number, user: any, currManager?: EntityManager): Promise<AcaoEntity>;
    allAcao(cdticket: number, user: any): Promise<AcaoEntity[]>;
    startServico(cdacao: number, user: any, customManager?: EntityManager): Promise<void>;
    stopServico(user: any, manager?: EntityManager): Promise<void>;
    closeServico(user: any, acao: AcaoEntity, manager?: EntityManager): Promise<void>;
    delete(cdacao: any, user: any): Promise<void>;
    addAcaoAfterTicketUpdate(oldTicket: any, newTicket: TicketEntity, user: any, manager?: EntityManager): Promise<void>;
    addAcao(data: AcaoAddDTO, user: any, manager: EntityManager, validateCdticket: any): Promise<{
        cd: number;
    }>;
}
