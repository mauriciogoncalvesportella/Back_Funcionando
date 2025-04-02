import { MotivoEntity } from "./motivo.entity";
import { MotivoAddDTO, MotivoUpdateDTO } from "./atendimento.dto";
import { Repository } from "typeorm";
import { CadastroServiceInterface } from "src/shared/interfaces";
export declare class MotivoService implements CadastroServiceInterface {
    private motivoRepository;
    constructor(motivoRepository: Repository<MotivoEntity>);
    add(data: MotivoAddDTO[]): Promise<MotivoEntity[]>;
    all(): Promise<MotivoEntity[]>;
    update(data: MotivoUpdateDTO[]): Promise<MotivoEntity[]>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
