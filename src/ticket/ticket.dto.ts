import {IsInt, IsOptional, IsNumber, ArrayNotEmpty, IsString, IsObject, IsArray, ValidateNested, IsNotEmptyObject, IsBoolean, IsIn, IsISO8601} from "class-validator";
import {Type} from "class-transformer";

export class TicketAddDTO {
  @IsBoolean()
  @IsOptional()
  emitAcao: boolean;

  @IsInt()
  @IsOptional()
  cd: number;

  @IsInt()
  @IsOptional()
  cdmotivo: number;

  @IsInt()
  @IsOptional()
  fgticket: number;

  @IsInt()
  @IsOptional()
  cdsolicitante: number;

  @IsInt()
  @IsOptional()
  cdsituacao: number;

  @IsInt()
  @IsOptional()
  cdurgencia: number;
  
  @IsInt()
  @IsOptional()
  cdsistema: number;

  //@IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  users: Array<number>;

  @IsInt()
  @IsOptional()
  cdresponsavel: number;

  @IsOptional()
  @IsInt()
  cdatendimento: number;

  @IsISO8601()
  @IsOptional()
  dtprevisao: Date; 
}

export class allUsersFromTicketDTO {
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  cdticketArray: Array<number>;
}

export class AcaoAnexoDownloadDTO {
  @IsNumber()
  cdticket: number;

  @IsNumber()
  cdacao: number;

  @IsString()
  nmfile: string;
}

export class TicketFilterDTO {
  @IsObject()
  options: any;

  @IsOptional()
  @IsBoolean()
  ticketsdia: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  cd: Array<number>;

  @IsOptional()
  @IsNumber({}, { each: true })
  fgticket: Array<number>;

  @IsOptional()
  @IsNumber({}, { each: true })
  situacao: Array<number>;

  @IsOptional()
  @IsNumber({}, { each: true })
  urgencia: Array<number>;

  @IsOptional()
  @IsNumber({}, {each: true})
  motivo: Array<number>;

  @IsOptional()
  @IsNumber({}, { each: true })
  users: Array<number>;

  @IsOptional()
  @IsNumber({}, { each: true })
  chaves: Array<number>;

  @IsOptional()
  @IsISO8601()
  dt0: string;

  @IsOptional()
  @IsISO8601()
  dt1: string;
}

export class AcaoAddDTO {
  @IsOptional()
  @IsInt()
  cd: number;

  @IsOptional()
  @IsInt()
  cdticket: number;

  @IsOptional()
  @IsInt()
  cdresponsavel: number;

  @IsOptional()
  @IsInt()
  cdsituacao: number;

  @IsOptional()
  @IsInt()
  cduser: number;

  @IsOptional()
  @IsInt()
  fgstatus: number;

  @IsOptional()
  @IsString()
  nmassunto: string;

  @IsOptional()
  @IsString()
  mmdesc: string;

  @IsOptional()
  @IsArray()
  jsanexos: Array<any>;
}

export class TicketAcaoAddDTO {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => TicketAddDTO)
  ticket!: TicketAddDTO;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AcaoAddDTO)
  acao!: AcaoAddDTO;
}

export class LinkAtendimentoToTicketDTO {
  @IsInt()
  cdticket: number;

  @IsInt()
  cdatendimento: number;
}

export class LinkUserToTicketDTO {
  @IsInt()
  cdticket: number;

  @IsInt()
  cduser: number;
}

export class ChangeSituacaoDTO {
  @IsInt()
  cd: number;

  @IsInt()
  cdsituacao: number;
}

export class SituacaoAddDTO {
  @IsString()
  nmsituacao: string;

  @IsString()
  idicon: string;
}

export class SituacaoUpdateDTO extends SituacaoAddDTO {
  @IsNumber()
  cd: number;
}

export class UrgenciaAddDTO {
  @IsString()
  nmurgencia: string;

  @IsString()
  idcolor: string;

  @IsNumber()
  nprevisao: number;
}

export class UrgenciaUpdateDTO extends UrgenciaAddDTO {
  @IsNumber()
  cd: number;
}
