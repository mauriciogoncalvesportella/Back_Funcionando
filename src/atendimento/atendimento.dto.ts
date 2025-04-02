import { IsInt, IsString, IsDateString, IsOptional, IsArray, IsBoolean, IsNumber } from "class-validator";
import { Timestamp } from "typeorm";

export class AtendimentoAddDTO {
  @IsInt()
  @IsOptional()
  cdchave: Number; 

  @IsInt()
  cdorigem: Number;

  @IsInt()
  cdmotivo: Number;

  @IsInt()
  @IsOptional()
  cdfila: number;
}

export class AtendimentoChangeMotivoDTO {
  @IsInt()
  cdatendimento: number;

  @IsInt()
  cdmotivo: number;
}

export class AtendimentoStopStartDTO {
  @IsInt()
  cdatendimento: number;
}

export class AtendimentoDoneDTO {
  @IsInt()
  cd: Number;
}

export class AtendimentoAdminDTO {
  @IsOptional()
  @IsArray()
  atendimentos: Array<any>;

  @IsOptional()
  @IsDateString()
  dtinicio: Timestamp;

  @IsOptional()
  @IsDateString()
  dtfim: Timestamp;

  @IsOptional()
  @IsArray()
  users: Array<any>;

  @IsOptional()
  @IsArray()
  clientes: Array<any>;

  @IsOptional()
  @IsBoolean()
  completed: Boolean;

  @IsOptional()
  @IsArray()
  notNull: String[];
}

class timeElapse {
  dtinicio : Date;
  dtfim : Date;
}

export class AtendimentoUpdateDTO {
  @IsNumber()
  cd: Number;

  @IsOptional()
  @IsDateString()
  dtinicio: Date;

  @IsOptional()
  @IsDateString()
  dtfim: Date;

  @IsOptional()
  @IsNumber()
  cdchave: Number;

  @IsOptional()
  @IsArray()
  jslista: Array<timeElapse>;
  
  @IsOptional()
  @IsBoolean()
  done: boolean;
}

export class OrigemAddDTO {
  @IsString()
  nmorigem: string;

  @IsString()
  idicon: string;
}

export class OrigemUpdateDTO extends OrigemAddDTO {
  @IsNumber()
  cd: number;
}

export class MotivoAddDTO {
  @IsString()
  nmmotivo: string;
}

export class MotivoUpdateDTO extends MotivoAddDTO {
  @IsNumber()
  cd: number;
}
