import { FilesService } from './files.service';
export declare class FilesController {
    private fileService;
    constructor(fileService: FilesService);
    downloadTicketTableCSV(req: any, res: any, query: any): Promise<void>;
}
