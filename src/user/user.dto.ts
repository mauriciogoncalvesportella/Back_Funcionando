import { IsNotEmpty, IsString, IsNumber, IsEmail, IsOptional, IsArray, ArrayNotEmpty } from "class-validator";
import {Type} from "class-transformer";

export class Turno {
  @IsString()
  public dtinicio: string;

  @IsString()
  public dtfim: string;

  constructor(dtinicio: string, dtfim: string) {
    this.dtinicio = dtinicio
    this.dtfim = dtfim
  }
}

export class UserLoginDTO {
  @IsString()
  idlogin: string;

  @IsString()
  idsenha: string;
}

export class UserCreateDTO {
  @IsString()
  idlogin: string;

  @IsString()
  idsenha: string;

  @IsNumber()
  grupoacesso: number;

  @IsString()
  idnome: string;

  @IsString()
  @IsEmail()
  idemail: string;

  @IsString()
  idcolor: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Turno)
  jsturnos: Turno[];
}

export class UserUpdateDTO {
  @IsNumber()
  cd: number;

  @IsOptional()
  @IsString()
  idlogin: string;

  @IsOptional()
  @IsString()
  idsenha: string;

  @IsOptional()
  @IsNumber()
  grupoacesso: number;

  @IsOptional()
  @IsString()
  idnome: string;

  @IsOptional()
  @IsString()
  idcolor: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  idemail: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Turno)
  jsturnos: Turno[];
}

export class GrupoAcessoAddDTO {
  @IsNumber()
  @IsOptional()
  cd: number;

  @IsString()
  @IsOptional()
  idnome: String;

  @IsString()
  @IsOptional()
  idicon: String;
  
  @IsArray()
  @IsOptional()
  jsroles: String[]
}
