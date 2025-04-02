import { ChaveFoneEntity } from "./chavefone.entity";
import { Repository } from "typeorm";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { ChaveEntity } from "./chave.entity";
import { UserEntity } from "src/user/user.entity";
import { AtendimentoService } from "src/atendimento/atendimento.service";
export declare class Xc3Service {
    private chaveFoneRepository;
    private chaveRepository;
    private userRepository;
    private websocketGateway;
    private atendimentoService;
    constructor(chaveFoneRepository: Repository<ChaveFoneEntity>, chaveRepository: Repository<ChaveEntity>, userRepository: Repository<UserEntity>, websocketGateway: WebsocketGateway, atendimentoService: AtendimentoService);
    addAtendimento(idRamal: string, cdchave: number): Promise<void>;
    getFoneList(): Promise<string[]>;
    addFone(fone: string): Promise<void>;
    bind(fone: string, cdchave: number, idnome?: string): Promise<void>;
    getClientInfo(phone: string): Promise<{
        status: string;
        phone: string;
        name: string;
        code: Number;
        indebt: boolean;
        supervisor: string;
    } | {
        status: string;
        phone?: undefined;
        name?: undefined;
        code?: undefined;
        indebt?: undefined;
        supervisor?: undefined;
    }>;
}
