import { AgendaService } from './agenda.service';
import { EventoAddDTO, TipoAgendamentoAddDTO, TipoAgendamentoUpdateDTO, EventoUpdateDTO, EventoDuplicarDTO, EventoFixarDTO } from './agenda.dto';
import { TipoAgendamentoService } from './tpagendamento.service';
import { TipoAgendamentoEntity } from './tipoagendamento.entity';
export declare class AgendaController {
    private agendaService;
    private tipoAgendamentoService;
    constructor(agendaService: AgendaService, tipoAgendamentoService: TipoAgendamentoService);
    eventoAdd(req: any, data: EventoAddDTO): Promise<import("./evento.entity").EventoEntity>;
    eventoUpdate(req: any, data: EventoUpdateDTO): Promise<import("./evento.entity").EventoEntity>;
    fixarEvento(req: any, data: EventoFixarDTO): Promise<void>;
    eventoDuplicar(req: any, data: EventoDuplicarDTO): Promise<void>;
    eventoDelete(req: any, cd: number): Promise<void>;
    eventoAll(req: any, userTarget: number, dtinicio: string, dtfim: string): Promise<import("./evento.entity").EventoEntity[]>;
    tipoAgendamentoAll(): Promise<TipoAgendamentoEntity[]>;
    tipoAgendamentoAdd(data: TipoAgendamentoAddDTO[]): Promise<void>;
    tipoAgendamentoUpdate(data: TipoAgendamentoUpdateDTO[]): Promise<void>;
    tipoAgendamentoDelete(cd: number): Promise<void>;
}
