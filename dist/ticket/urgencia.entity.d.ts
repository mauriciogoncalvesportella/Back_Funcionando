import { TicketEntity } from "./ticket.entity";
import { OrdemInterface } from "src/shared/interfaces";
export declare class UrgenciaEntity implements OrdemInterface {
    cd: Number;
    tickets: TicketEntity[];
    dtcriacao: Date;
    nmurgencia: string;
    idcolor: string;
    nprevisao: number;
    nordem: number;
}
