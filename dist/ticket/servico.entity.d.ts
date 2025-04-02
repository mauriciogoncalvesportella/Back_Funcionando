export declare class PeriodoServico {
    dtinicio: Date;
    dtfim: Date;
}
export declare class ServicoEntity {
    cd: number;
    cduser: number;
    ntotal: number;
    jslista: Array<PeriodoServico>;
    dtinicio: Date;
    dtfim: Date;
    _cduser: number;
}
