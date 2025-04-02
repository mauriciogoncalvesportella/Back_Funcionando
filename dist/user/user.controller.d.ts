import { UserService } from './user.service';
import { UserCreateDTO, UserUpdateDTO, GrupoAcessoAddDTO } from './user.dto';
import { TableCreateDTO } from 'src/table/table.dto';
import { TableService } from 'src/table/table.service';
export declare class UserController {
    private userService;
    private tableService;
    constructor(userService: UserService, tableService: TableService);
    all(req: any): Promise<import("./user.entity").UserEntity[]>;
    addGrupoAcesso(data: GrupoAcessoAddDTO): Promise<void>;
    allGrupoAcesso(req: any): Promise<import("./grupoAcesso.entity").GrupoAcessoEntity[]>;
    getTable(req: any, nmtable: any): Promise<import("../table/table.entity").TableEntity>;
    setTable(req: any, data: TableCreateDTO, nmtable: any): Promise<{
        statusCode: number;
    }>;
    register(data: UserCreateDTO): Promise<import("./user.entity").UserEntity>;
    update(data: UserUpdateDTO): void;
}
