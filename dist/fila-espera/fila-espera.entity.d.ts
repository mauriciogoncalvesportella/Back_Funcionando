import { BaseEntity } from "typeorm";
export declare class FilaEsperaEntity extends BaseEntity {
    cd: number;
    cdchave: number;
    dtcriacao: Date;
    dtfinalizado: Date;
    cdsolicitante: number;
    cduser: number;
    mmobservacao: string;
    cdatendimento: number;
    fgstatus: number;
    fgurgente: boolean;
    _cduser: number;
    _cdchave: number;
    _cdsolicitante: number;
    _cdatendimento: number;
    saveAndReload(): Promise<this>;
}
