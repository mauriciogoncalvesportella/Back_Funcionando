import { FilaEsperaService } from './fila-espera.service';
import { FilaEsperaCreateDTO, FilaEsperaAllDTO } from './fila-espera.dto';
import { FilaEsperaEntity } from './fila-espera.entity';
export declare class FilaEsperaController {
    private filaEsperaService;
    constructor(filaEsperaService: FilaEsperaService);
    add(req: any, data: FilaEsperaCreateDTO): Promise<FilaEsperaEntity>;
    getOnline(): Promise<FilaEsperaEntity[]>;
    delete(req: any, cd: number): Promise<void>;
    all(allDTO: FilaEsperaAllDTO): Promise<FilaEsperaEntity[]>;
}
