import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, Timestamp, Unique, OneToMany, OneToOne, RelationId, JoinColumn, ManyToOne } from "typeorm";
import { AtendimentoEntity } from "src/atendimento/atendimento.entity";
import { SolicitanteEntity } from "./solicitante.entity"
import { ChaveFoneEntity } from "./chavefone.entity";
import {UserEntity} from "src/user/user.entity";

@Entity('tchave')
@Unique(['cdcliente', 'idcnpj', 'cdsistema'])
export class ChaveEntity {
  @PrimaryGeneratedColumn()
  cd: Number;

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Timestamp;

  @Column('int')
  cdcliente: number;

  @Column('varchar', { length: 255 })
  idfantasia: string;

  @Column('varchar', { length: 255 })
  nmrazao: string;

  @Column('varchar', { length: 18 })
  idcnpj: string;

  @Column('int')
  cdsistema: number;

  @Column('int')
  nrcontrole: number;

  @Column('int')
  nrempresas: number;

  @Column('int')
  nrusuarios: number;

  @Column({ type: 'timestamp', nullable: true })
  dtvalidade: Date;

  @Column({ type: 'timestamp', nullable: true })
  dtexpedicao: Date;

  @Column('varchar', { length: 15 })
  idversaoexe: string;

  @Column('varchar', { length: 15 })
  idversaodb: string;

  @Column('text')
  dschave: string;

  @Column({ type: 'timestamp', nullable: true })
  dtatualizacao: Date;

  @ManyToOne(type => UserEntity, user => user.cd, { nullable: true })
  cdresponsavel: number

  @OneToMany(type => AtendimentoEntity, atendimento => atendimento.cdchave)
  atendimentos: AtendimentoEntity[];

  @OneToMany(type => SolicitanteEntity, solicitante => solicitante.cdchave)
  solicitantes: SolicitanteEntity[];

  @OneToMany(type => ChaveFoneEntity, chaveFone => chaveFone.cdchave)
  chaveFones: ChaveFoneEntity[];

  @RelationId((chave: ChaveEntity) => chave.cdresponsavel)
  _cdresponsavel?: number;
}
