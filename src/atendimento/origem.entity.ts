import { Entity,  PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import {AtendimentoEntity} from "./atendimento.entity";
import {OrdemInterface} from "src/shared/interfaces";

@Entity('torigem')
export class OrigemEntity implements OrdemInterface {
  @PrimaryGeneratedColumn()
  cd: Number;

  @OneToMany(type => AtendimentoEntity, atendimento => atendimento.cdorigem)
  atendimentos: AtendimentoEntity[];

  @Column({ type: 'varchar', nullable: false })
  nmorigem: string;

  @Column({ type: 'varchar', nullable:false })
  idicon: string;

  @Column('int', { nullable: true })
  nordem: number;
}
