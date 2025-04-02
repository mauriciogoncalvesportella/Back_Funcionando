import { AtendimentoEntity } from "./atendimento.entity";
import { OrdemInterface } from "src/shared/interfaces";
export declare class MotivoEntity implements OrdemInterface {
    cd: Number;
    atendimentos: AtendimentoEntity[];
    dtcriacao: Date;
    nordem: number;
    nmmotivo: string;
}
