import { IsNotEmpty, IsString, IsNumber, IsInt, IsDate, IsDateString, Matches, IsJSON, IsObject, IsArray } from "class-validator";
import { Timestamp, Column } from "typeorm";

export class TableCreateDTO {
  @IsArray()
  jscontent: Array<any>;
}

export class TableSearchDTO {
  @IsString()
  nmtable: string;
}

export class TableDTO {
  @IsString()
  nmtable: string;

  @IsArray()
  jscontent: Array<any>;
}
