import { TableEntity } from './table.entity';
import { Repository } from 'typeorm';
import { TableCreateDTO } from './table.dto';
export declare class TableService {
    private tableRepository;
    constructor(tableRepository: Repository<TableEntity>);
    getTable(nmtable: string, user: any): Promise<TableEntity>;
    setTable(nmtable: string, data: TableCreateDTO, user: any): Promise<{
        statusCode: number;
    }>;
}
