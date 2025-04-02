import { Repository } from 'typeorm';
import { OrigemAddDTO, OrigemUpdateDTO } from './atendimento.dto';
import { OrigemEntity } from './origem.entity';
import { CadastroServiceInterface } from 'src/shared/interfaces';
export declare class OrigemService implements CadastroServiceInterface {
    private origemRepository;
    constructor(origemRepository: Repository<OrigemEntity>);
    add(data: OrigemAddDTO): Promise<OrigemEntity>;
    all(): Promise<OrigemEntity[]>;
    update(data: OrigemUpdateDTO[]): Promise<OrigemEntity[]>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
