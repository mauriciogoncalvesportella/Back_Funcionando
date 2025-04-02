import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserUpdateDTO, GrupoAcessoAddDTO } from './user.dto';
import { GrupoAcessoEntity } from './grupoAcesso.entity';
export declare class UserService {
    private userRepository;
    private grupoAcessoRepository;
    constructor(userRepository: Repository<UserEntity>, grupoAcessoRepository: Repository<GrupoAcessoEntity>);
    all(): Promise<UserEntity[]>;
    addGrupoAcesso(data: GrupoAcessoAddDTO): Promise<void>;
    allGrupoAcesso(): Promise<GrupoAcessoEntity[]>;
    findOne(idlogin: string): Promise<UserEntity | undefined>;
    login(idlogin: string, idsenha: string): Promise<UserEntity>;
    register(data: UserCreateDTO): Promise<UserEntity>;
    update(data: UserUpdateDTO): Promise<void>;
}
