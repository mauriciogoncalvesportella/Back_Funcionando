import { UserEntity } from "src/user/user.entity";
export declare class Recorrencia {
    id: string;
    list: Array<number>;
    inicio: string;
    fim: string;
    constructor(id: string, list: Array<number>, inicio: string, fim: string);
}
export declare class EventoEntity {
    cd: number;
    nmtitulo: string;
    nmlocal: string;
    mmdesc: string;
    fgcadeado: boolean;
    fgcobrarvisita: boolean;
    fgconfirmado: boolean;
    fgdiatodo: boolean;
    fgrecorrente: boolean;
    dtinicio: Date;
    dtfim: Date;
    dtrealizadoinicio: Date;
    dtrealizadofim: Date;
    indexdtinicio: number;
    indexdtfim: number;
    nmcontato: string;
    idtelefone: string;
    jsrecorrencia: Recorrencia;
    cdeventorecorrente: number;
    cdtipoagendamento: number;
    cdchave: number;
    cdresponsavel: number;
    users: UserEntity[];
    _cdtipoagendamento: number;
    _cdchave: number;
    _cdusers: number[];
    _cdresponsavel: number;
}
