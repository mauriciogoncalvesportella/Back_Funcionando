import {PrimaryGeneratedColumn, Column, BeforeInsert, Entity} from "typeorm";

export interface OrdemInterface {
  nordem: number;
}

export interface CadastroServiceInterface {
  add (data: any) : Promise<any>;
  all () : Promise< Array<any> >;
  update (data: Array<any>) : Promise< Array<any> >;
  delete (cd: number) : Promise<void>;
  nextOrdem () : Promise<number>;
}

export abstract class CadastroService {

}
