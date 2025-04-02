import { ChaveService } from './chave.service';
import { ChaveCreateDTO, getVersaoDTO, updateVersaoDTO, updateChaveDTO, addSolicitanteDTO, updateDtvalidadeDTO, AllChavesFonesDTO, UpdateChaveFoneDTO, CreateChaveFoneDTO } from './chave.dto';
export declare class ChaveController {
    private chaveService;
    constructor(chaveService: ChaveService);
    allClientesFromChave(req: any, cd: Number): Promise<import("./solicitante.entity").SolicitanteEntity[]>;
    addSolicitante(solicitante: addSolicitanteDTO): Promise<Number>;
    updateDtvalidade(dto: updateDtvalidadeDTO): Promise<{
        dtvalidade: Date;
    }>;
    allChaves(req: any): Promise<import("./chave.entity").ChaveEntity[]>;
    allChavesFones(dto: AllChavesFonesDTO): Promise<import("./chave.entity").ChaveEntity[]>;
    updateChaveFone(dto: UpdateChaveFoneDTO): Promise<void>;
    createChaveFone(dto: CreateChaveFoneDTO): Promise<import("./chavefone.entity").ChaveFoneEntity>;
    deleteChaveFone(cd: number): Promise<void>;
    add(data: ChaveCreateDTO[]): Promise<void>;
    getVersao(data: getVersaoDTO): Promise<{
        idversaoexe: string;
        idversaodb: string;
        dtatualizacao: Date;
    }>;
    updateVersao(data: updateVersaoDTO): Promise<import("./chave.entity").ChaveEntity>;
    updateChave(data: updateChaveDTO): Promise<void>;
}
