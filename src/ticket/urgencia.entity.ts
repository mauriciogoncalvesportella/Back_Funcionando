import { Entity, Unique,  PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, BeforeInsert, OneToMany } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { ChaveEntity } from "src/chave/chave.entity";
import {OrdemInterface} from "src/shared/interfaces";
const shortid = require('shortid')

@Entity('turgencia')
export class UrgenciaEntity implements OrdemInterface {
  @PrimaryGeneratedColumn()
  cd: Number;

  @OneToMany(type => TicketEntity, ticket => ticket.cdurgencia)
  tickets: TicketEntity[];  

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Date;

  @Column({ type: 'varchar', nullable: false })
  nmurgencia: string;

  @Column({ type: 'varchar', nullable: true})
  idcolor: string;

  @Column({ type: 'int', nullable: true })
  nprevisao: number;

  @Column({ type: 'int', nullable: true })
  nordem: number;
}
