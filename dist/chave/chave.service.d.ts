import { ChaveEntity } from './chave.entity';
import { Repository, Connection } from 'typeorm';
import { ChaveCreateDTO, getVersaoDTO, updateVersaoDTO, updateChaveDTO, addSolicitanteDTO, updateDtvalidadeDTO, AllChavesFonesDTO, UpdateChaveFoneDTO, CreateChaveFoneDTO } from './chave.dto';
import { SolicitanteEntity } from './solicitante.entity';
import { ChaveFoneEntity } from './chavefone.entity';
export declare class ChaveService {
    private solicitanteRepository;
    private chaveRepository;
    private chaveFoneRepository;
    private connection;
    constructor(solicitanteRepository: Repository<SolicitanteEntity>, chaveRepository: Repository<ChaveEntity>, chaveFoneRepository: Repository<ChaveFoneEntity>, connection: Connection);
    add(listChavesDTO: ChaveCreateDTO[]): Promise<void>;
    addSolicitante(item: addSolicitanteDTO): Promise<Number>;
    updateDtvalidade(dto: updateDtvalidadeDTO): Promise<{
        dtvalidade: Date;
    }>;
    getAllChaves(): Promise<ChaveEntity[]>;
    getAllChavesFones(dto: AllChavesFonesDTO): Promise<ChaveEntity[]>;
    updateChaveFone(dto: UpdateChaveFoneDTO): Promise<ChaveFoneEntity>;
    createChaveFone(dto: CreateChaveFoneDTO): Promise<ChaveFoneEntity>;
    deleteChaveFone(cd: number): Promise<void>;
    getVersao(data: getVersaoDTO): Promise<{
        idversaoexe: string;
        idversaodb: string;
        dtatualizacao: Date;
    }>;
    updateVersao(data: updateVersaoDTO): Promise<ChaveEntity>;
    updateChave(data: updateChaveDTO): Promise<void>;
    allSolicitantesFromChave(cd: Number): Promise<SolicitanteEntity[]>;
}
