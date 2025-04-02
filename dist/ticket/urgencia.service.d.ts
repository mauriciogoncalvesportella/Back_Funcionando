import { Repository } from "typeorm";
import { UrgenciaEntity } from "./urgencia.entity";
import { UrgenciaAddDTO, UrgenciaUpdateDTO } from "./ticket.dto";
import { CadastroServiceInterface } from "src/shared/interfaces";
export declare class UrgenciaService implements CadastroServiceInterface {
    private urgenciaRepository;
    constructor(urgenciaRepository: Repository<UrgenciaEntity>);
    add(data: UrgenciaAddDTO[]): Promise<UrgenciaEntity[]>;
    all(): Promise<UrgenciaEntity[]>;
    update(data: UrgenciaUpdateDTO[]): Promise<UrgenciaEntity[]>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
