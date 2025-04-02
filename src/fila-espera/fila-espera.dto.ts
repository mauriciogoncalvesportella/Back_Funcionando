import {IsInt, IsIn, IsString, IsOptional, IsNumber, IsBoolean, IsISO8601} from "class-validator";

export class FilaEsperaCreateDTO {
  @IsInt()
  cdchave: number;

  @IsInt()
  cdsolicitante: number;

  @IsString()
  @IsOptional()
  mmobservacao: string;

  @IsOptional()
  @IsNumber()
  cduser: number;

  @IsOptional()
  @IsBoolean()
  fgurgente: boolean = false;
}

export class FilaEsperaAllDTO {
  @IsInt()
  skip: number;

  @IsInt()
  take: number;

  @IsInt()
  @IsOptional()
  cdchave: number;

  @IsInt()
  @IsOptional()
  cdsolicitante: number;

  @IsISO8601()
  @IsOptional()
  date: string;
}
/*
  cd: Number;
  cdchave: Number;
  dtcriacao: Date;
  cdsolicitante: number;
  cduserretorno: Number;
  mmobservacao: String;
  cdticket: number;
  fgstatus: number;
*/
