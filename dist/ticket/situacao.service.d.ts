import { Repository } from "typeorm";
import { SituacaoEntity } from "./situacao.entity";
import { SituacaoAddDTO, SituacaoUpdateDTO } from "./ticket.dto";
import { CadastroServiceInterface } from "src/shared/interfaces";
export declare class SituacaoService implements CadastroServiceInterface {
    private situacaoRepository;
    constructor(situacaoRepository: Repository<SituacaoEntity>);
    add(data: SituacaoAddDTO[]): Promise<SituacaoEntity[]>;
    all(): Promise<SituacaoEntity[]>;
    update(data: SituacaoUpdateDTO[]): Promise<SituacaoEntity[]>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
