import { Entity,  PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, BeforeInsert, OneToMany, OneToOne, JoinTable, JoinColumn, ManyToMany, RelationId, Repository, Index } from "typeorm";
import { AtendimentoEntity } from "src/atendimento/atendimento.entity";
import { UrgenciaEntity } from "./urgencia.entity"
import { SolicitanteEntity } from "src/chave/solicitante.entity";
import { SituacaoEntity } from "./situacao.entity";
import { AcaoEntity } from "./acao.entity";
import { UserEntity } from "src/user/user.entity";

const shortid = require('shortid');

@Entity('tticket')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @Column('boolean', { default: false })
  @Index()
  fgarquivado: boolean;

  @Column({ type: 'json', nullable: true })
  jskanbanorder: Object;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  dtcriacao: Date;

  @Column('smallint', { nullable: true })
  fgticket: number;

  @Column('int', { nullable: true })
  cdsistema: number;

  @Column('int', { nullable: true })
  ntotal: number;

  @Column('varchar', { nullable: true })
  nmtitulo: string;

  @Column({ type: 'timestamp', nullable: true})
  dtprevisao: Date;

  @OneToOne(type => AtendimentoEntity, atendimento => atendimento.cdticket, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Index()
  cdatendimento: number;

  @OneToMany(type => AcaoEntity, acao => acao.cdticket, { nullable: true })
  acoes: AcaoEntity[]

  @ManyToOne(type => UrgenciaEntity, urgencia => urgencia.cd, { nullable: true })
  @Index()
  cdurgencia: number;

  @ManyToOne(type => SolicitanteEntity, solicitante => solicitante.cd, { nullable: true })
  @Index()
  cdsolicitante: number;

  @ManyToOne(type => SituacaoEntity, situacao => situacao.cd, { nullable: true })
  @Index()
  cdsituacao: number;

  @ManyToOne(type => UserEntity, user => user.cd, { nullable: true })
  @Index()
  cdresponsavel: number;

  @ManyToMany(type => UserEntity, entity => entity.tickets, { onDelete: 'CASCADE' })
  @JoinTable()
  users: UserEntity[];

  @RelationId((ticket: TicketEntity) =>  ticket.cdurgencia)
  _cdurgencia: number;

  @RelationId((ticket: TicketEntity) =>  ticket.cdsolicitante)
  _cdsolicitante: number;
  
  @RelationId((ticket: TicketEntity) =>  ticket.cdsituacao)
  _cdsituacao: number;

  @RelationId((ticket: TicketEntity) => ticket.cdresponsavel)
  _cdresponsavel: number;

  @RelationId((ticket: TicketEntity) => ticket.users)
  _cdusers: number[];
}
