import { Request, Response } from 'express';
import { TicketService } from './ticket.service';
import { TicketAddDTO, AcaoAddDTO, TicketAcaoAddDTO, ChangeSituacaoDTO, TicketFilterDTO, AcaoAnexoDownloadDTO, allUsersFromTicketDTO, SituacaoAddDTO, SituacaoUpdateDTO, UrgenciaUpdateDTO, UrgenciaAddDTO } from './ticket.dto';
import { AcaoService } from './acao.service';
import { SituacaoEntity } from './situacao.entity';
import { SituacaoService } from './situacao.service';
import { UrgenciaEntity } from './urgencia.entity';
import { UrgenciaService } from './urgencia.service';
export declare class TicketController {
    private ticketService;
    private acaoService;
    private situacaoService;
    private urgenciaService;
    constructor(ticketService: TicketService, acaoService: AcaoService, situacaoService: SituacaoService, urgenciaService: UrgenciaService);
    allUsersFromTicket(req: any, data: allUsersFromTicketDTO): Promise<import("./ticket.entity").TicketEntity[]>;
    addTicket(req: any, data: TicketAddDTO): Promise<{
        cd: any;
    }>;
    kanban(req: any): Promise<import("../user/user.entity").UserEntity[]>;
    getTicket(req: any, cd: number): Promise<import("./ticket.entity").TicketEntity>;
    allAcao(req: any, cdticket: number): Promise<import("./acao.entity").AcaoEntity[]>;
    deleteAcao(req: any, cdacao: number): void;
    allFilter(req: any, data: TicketFilterDTO): Promise<[import("./ticket.entity").TicketEntity[], number]>;
    allFilterPaginate(req: any, data: TicketFilterDTO): Promise<[import("./ticket.entity").TicketEntity[], number]>;
    addTicketAcao(req: any, data: TicketAcaoAddDTO): Promise<{
        ticket: any;
        acao: any;
    }>;
    addAcao(req: any, data: AcaoAddDTO): Promise<{
        cd: number;
    }>;
    uploadFile(files: any): void;
    uploadImage(file: any, req: Request): Promise<{
        url: string;
    }>;
    downloadFile(req: Request, res: Response, data: AcaoAnexoDownloadDTO): void;
    allMeta(req: any): Promise<{
        urgencia: UrgenciaEntity[];
        motivo: import("../atendimento/motivo.entity").MotivoEntity[];
        situacao: SituacaoEntity[];
        origem: import("../atendimento/origem.entity").OrigemEntity[];
    }>;
    changeSituacao(req: any, data: ChangeSituacaoDTO): Promise<void>;
    updateJslistaKanban(req: any, data: any): Promise<void>;
    startServicoAcao(req: any, cdacao: number): Promise<void>;
    stopServicoAcao(req: any): Promise<void>;
    getAcao(req: any, cdacao: number): Promise<import("./acao.entity").AcaoEntity>;
    situacaoAll(): Promise<SituacaoEntity[]>;
    situacaoUpdate(data: SituacaoUpdateDTO[]): Promise<void>;
    situacaoAdd(data: SituacaoAddDTO[]): Promise<void>;
    situacaoDelete(cd: number): Promise<void>;
    urgenciaAll(): Promise<UrgenciaEntity[]>;
    urgenciaUpdate(data: UrgenciaUpdateDTO[]): Promise<void>;
    urgenciaAdd(data: UrgenciaAddDTO[]): Promise<void>;
    urgenciaDelete(cd: number): Promise<void>;
}
