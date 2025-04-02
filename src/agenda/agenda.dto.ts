import {IsString, IsBoolean, IsISO8601, IsInt, IsNumber, IsOptional, IsArray, IsObject, IsBooleanString} from "class-validator";
import {Recorrencia} from "./evento.entity";

export class EventoAddDTO {
  @IsString()
  nmtitulo: string;

  @IsString()
  @IsOptional()
  nmlocal: string;

  @IsString()
  mmdesc: string;

  @IsBoolean()
  fgconfirmado: boolean;

  @IsBoolean()
  fgcobrarvisita: boolean;

  @IsBoolean()
  fgdiatodo: boolean;

  @IsBoolean()
  fgrecorrente: boolean;

  @IsISO8601()
  @IsOptional()
  dtinicio: Date;

  @IsISO8601()
  @IsOptional()
  dtfim: Date;

  @IsISO8601()
  @IsOptional()
  dtrealizadoinicio: Date;

  @IsISO8601()
  @IsOptional()
  dtrealizadofim: Date;

  @IsString()
  @IsOptional()
  nmcontato: string;

  @IsObject()
  @IsOptional()
  jsrecorrencia: Recorrencia;

  @IsNumber()
  cdtipoagendamento: number;

  @IsNumber()
  @IsOptional()
  cdchave: number;

  @IsString()
  @IsOptional()
  idtelefone: string;

  @IsNumber({}, { each: true })
  users: Array<number>;

  @IsBoolean()
  @IsOptional()
  fgcadeado: boolean;
}

export class EventoUpdateDTO extends EventoAddDTO {
  @IsNumber()
  cd: number;
}

export class TipoAgendamentoAddDTO {
  @IsString()
  nmtipoagendamento: string;
}

export class TipoAgendamentoUpdateDTO extends TipoAgendamentoAddDTO {
  @IsNumber()
  cd: number;
}

export class EventoDuplicarDTO {
  @IsNumber()
  cd: number;

  @IsISO8601({}, { each: true })
  dates: string[];
}

export class FixarRecorrencia {
  @IsNumber()
  cd: number;

  @IsString()
  @IsOptional()
  mmdesc: string;
}

export class EventoFixarDTO {
  @IsNumber()
  cd: number;

  @IsISO8601()
  dtrecorrente: Date;

  @IsString()
  @IsOptional()
  mmdesc: string;
}
