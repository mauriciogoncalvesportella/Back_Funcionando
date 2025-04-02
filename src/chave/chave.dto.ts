import { IsNotEmpty, IsString, IsNumber, IsInt, IsDate, IsDateString, Matches, IsOptional, IsISO8601, IsIn } from "class-validator";
import { Timestamp, Column } from "typeorm";

export class ChaveCreateDTO {
  @IsInt()
  cdcliente: number;

  @IsString()
  idfantasia: string;
  
  @IsString()
  nmrazao: string;

  @IsString()
  @Matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  idcnpj: string;

  @IsInt()
  cdsistema: number;

  @IsInt()
  nrcontrole: number;

  @IsInt()
  nrempresas: number;

  @IsInt()
  nrusuarios: number;

  @IsDateString()
  dtvalidade: string;

  @IsDateString()
  dtexpedicao: string;

  @IsString()
  idversaoexe: string;

  @IsString()
  idversaodb: string;

  @IsString()
  dschave: string;
}

export class getVersaoDTO {
  @IsString()
  @Matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  idcnpj: string;

  @IsInt()
  cdsistema: number;
}

export class updateVersaoDTO {
  @IsString()
  @Matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  idcnpj: string;

  @IsInt()
  cdsistema: number;

  @IsOptional()
  @IsString()
  idversaoexe: string;

  @IsOptional()
  @IsString()
  idversaodb: string;
}

export class updateChaveDTO {
  @IsString()
  @Matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  idcnpj: string;

  @IsInt()
  cdsistema: number;

  @IsInt()
  nrcontrole: number;
  
  @IsInt()
  nrusuarios: number;

  @IsInt()
  nrempresas: number;

  @IsDateString()
  dtexpedicao: string;
  
  @IsDateString()
  dtvalidade: string;

  @IsString()
  dschave: string;
}

export class addSolicitanteDTO {
  @IsString()
  idsolicitante: string;

  @IsString()
  @IsOptional()
  idgpacesso: string;

  @IsNumber()
  cdchave: Number;
}

export class updateDtvalidadeDTO {
  @IsNumber()
  days: number;

  @IsNumber()
  cdchave: number;
} 

export class AllChavesFonesDTO {
  @IsInt()
  skip: number;

  @IsInt()
  take: number;

  @IsString()
  @IsOptional()
  search: string;
}

export class UpdateChaveFoneDTO {
  @IsNumber()
  cd: number;

  @IsString()
  @IsOptional()
  fone?: string;

  @IsString()
  @IsOptional()
  idnome?: string;
}

export class CreateChaveFoneDTO {
  @IsNumber()
  cdchave: number;

  @IsString()
  fone: string;

  @IsString()
  idnome: string;
}
