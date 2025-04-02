import { AcaoEntity } from "./acao.entity";
import { UserEntity } from "src/user/user.entity";
export declare class TicketEntity {
    cd: number;
    fgarquivado: boolean;
    jskanbanorder: Object;
    dtcriacao: Date;
    fgticket: number;
    cdsistema: number;
    ntotal: number;
    nmtitulo: string;
    dtprevisao: Date;
    cdatendimento: number;
    acoes: AcaoEntity[];
    cdurgencia: number;
    cdsolicitante: number;
    cdsituacao: number;
    cdresponsavel: number;
    users: UserEntity[];
    _cdurgencia: number;
    _cdsolicitante: number;
    _cdsituacao: number;
    _cdresponsavel: number;
    _cdusers: number[];
}
