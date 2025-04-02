import { Timestamp } from "typeorm";
import { AtendimentoEntity } from "src/atendimento/atendimento.entity";
import { SolicitanteEntity } from "./solicitante.entity";
import { ChaveFoneEntity } from "./chavefone.entity";
export declare class ChaveEntity {
    cd: Number;
    dtcriacao: Timestamp;
    cdcliente: number;
    idfantasia: string;
    nmrazao: string;
    idcnpj: string;
    cdsistema: number;
    nrcontrole: number;
    nrempresas: number;
    nrusuarios: number;
    dtvalidade: Date;
    dtexpedicao: Date;
    idversaoexe: string;
    idversaodb: string;
    dschave: string;
    dtatualizacao: Date;
    cdresponsavel: number;
    atendimentos: AtendimentoEntity[];
    solicitantes: SolicitanteEntity[];
    chaveFones: ChaveFoneEntity[];
    _cdresponsavel?: number;
}
