import { UserEntity } from './user.entity';
export declare class GrupoAcessoEntity {
    cd: Number;
    dtcriacao: Date;
    idnome: String;
    idicon: String;
    jsroles: Object;
    users: UserEntity[];
}
