import { Xc3Service } from "./xc3.service";
export declare class Xc3Controller {
    private xc3Service;
    constructor(xc3Service: Xc3Service);
    getFoneInfo(fone: string): Promise<any>;
    addAtendimento(ramal: string, cdchave: number): Promise<void>;
    bind(data: any): Promise<void>;
    getFoneList(): Promise<string[]>;
}
