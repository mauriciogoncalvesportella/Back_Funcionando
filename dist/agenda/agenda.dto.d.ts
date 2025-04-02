import { Recorrencia } from "./evento.entity";
export declare class EventoAddDTO {
    nmtitulo: string;
    nmlocal: string;
    mmdesc: string;
    fgconfirmado: boolean;
    fgcobrarvisita: boolean;
    fgdiatodo: boolean;
    fgrecorrente: boolean;
    dtinicio: Date;
    dtfim: Date;
    dtrealizadoinicio: Date;
    dtrealizadofim: Date;
    nmcontato: string;
    jsrecorrencia: Recorrencia;
    cdtipoagendamento: number;
    cdchave: number;
    idtelefone: string;
    users: Array<number>;
    fgcadeado: boolean;
}
export declare class EventoUpdateDTO extends EventoAddDTO {
    cd: number;
}
export declare class TipoAgendamentoAddDTO {
    nmtipoagendamento: string;
}
export declare class TipoAgendamentoUpdateDTO extends TipoAgendamentoAddDTO {
    cd: number;
}
export declare class EventoDuplicarDTO {
    cd: number;
    dates: string[];
}
export declare class FixarRecorrencia {
    cd: number;
    mmdesc: string;
}
export declare class EventoFixarDTO {
    cd: number;
    dtrecorrente: Date;
    mmdesc: string;
}
