declare class Atendimento {
    dtinicio: Date;
    dtfim: Date;
}
export declare class AtendimentoEntity {
    cd: number;
    dtcriacao: Date;
    jslista: Array<Atendimento>;
    fgativo: boolean;
    cdticket: Number;
    cduser: Number;
    cdmotivo: Number;
    cdorigem: Number;
    cdchave: Number;
    dtinicio: Date;
    dtfim: Date;
    cdfila: number;
    _cdorigem: Number;
    _cdchave: Number;
    _cdmotivo: Number;
    _cduser: Number;
    _cdticket: number;
    get tempoTotal(): number;
}
export {};
