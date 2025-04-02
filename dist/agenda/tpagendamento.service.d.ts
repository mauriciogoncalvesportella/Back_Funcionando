import { TipoAgendamentoEntity } from "./tipoagendamento.entity";
import { Repository } from "typeorm";
import { TipoAgendamentoAddDTO, TipoAgendamentoUpdateDTO } from "./agenda.dto";
import { CadastroServiceInterface } from "src/shared/interfaces";
export declare class TipoAgendamentoService implements CadastroServiceInterface {
    private tipoAgendamentoRepository;
    constructor(tipoAgendamentoRepository: Repository<TipoAgendamentoEntity>);
    add(data: TipoAgendamentoAddDTO[]): Promise<TipoAgendamentoEntity[]>;
    all(): Promise<TipoAgendamentoEntity[]>;
    update(data: TipoAgendamentoUpdateDTO[]): Promise<TipoAgendamentoEntity[]>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
