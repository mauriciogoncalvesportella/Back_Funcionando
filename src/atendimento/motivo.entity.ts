import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany} from "typeorm";
import {AtendimentoEntity} from "./atendimento.entity";
import {OrdemInterface} from "src/shared/interfaces";

@Entity('tmotivo')
export class MotivoEntity implements OrdemInterface {
  @PrimaryGeneratedColumn()
  cd: Number;

  @OneToMany(type => AtendimentoEntity, atendimento => atendimento.cdmotivo)
  atendimentos: AtendimentoEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Date;

  @Column('int', { nullable: true })
  nordem: number;

  @Column('varchar')
  nmmotivo: string;
}
