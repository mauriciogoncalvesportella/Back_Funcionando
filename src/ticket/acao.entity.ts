import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, BeforeInsert, RelationId, OneToOne, JoinColumn, Index} from "typeorm";
import {TicketEntity} from "./ticket.entity";
import {UserEntity} from "src/user/user.entity";
import {ServicoEntity} from "./servico.entity";

@Entity('tacao')
export class AcaoEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @ManyToOne(type => TicketEntity, ticket => ticket.cd, { onDelete: 'CASCADE' })
  @Index()
  cdticket: number;

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Date;

  @OneToOne(type => ServicoEntity, servico => servico.cd, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  cdservico: number;

  @ManyToOne(type => UserEntity, user => user.cd)
  cduser: number;

  /* 0: Ação aberta
   * 1: Ação concluida
  */
  @Column({ type: 'smallint', default: 0 })
  fgstatus: number;

  @Column({ type: 'text', nullable: true })
  mmdesc: String;

  @Column({ length: 255, nullable: true})
  nmassunto: String;

  @Column({ type: 'json', nullable: true, default: []})
  jsanexos: Object;

  @RelationId((acao: AcaoEntity) => acao.cduser)
  _cduser: number;

  @RelationId((acao: AcaoEntity) => acao.cdservico)
  _cdservico: number;

  @RelationId((acao: AcaoEntity) => acao.cdticket)
  _cdticket: number;

  /*
  @RelationId((acao: AcaoEntity) => acao.cdservico)
  _cdservico: number;
  */
}
