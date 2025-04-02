import {PrimaryGeneratedColumn, Column, Entity, BeforeInsert, AfterInsert} from "typeorm";
import {Logger} from "@nestjs/common";
import {OrdemInterface} from "src/shared/interfaces";

@Entity('ttipoagendamento')
export class TipoAgendamentoEntity implements OrdemInterface {
  @PrimaryGeneratedColumn()
  cd: number;

  @Column('int', { nullable: true })
  nordem: number;

  @Column('varchar')
  nmtipoagendamento: string;
}
