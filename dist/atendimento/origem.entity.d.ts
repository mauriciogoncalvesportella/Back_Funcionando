import { AtendimentoEntity } from "./atendimento.entity";
import { OrdemInterface } from "src/shared/interfaces";
export declare class OrigemEntity implements OrdemInterface {
    cd: Number;
    atendimentos: AtendimentoEntity[];
    nmorigem: string;
    idicon: string;
    nordem: number;
}
