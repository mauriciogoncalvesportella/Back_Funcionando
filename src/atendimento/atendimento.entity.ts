import { Entity, Unique,  PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, BeforeInsert, OneToOne, RelationId, Index, JoinColumn } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { ChaveEntity } from "src/chave/chave.entity";
import { OrigemEntity } from "./origem.entity";
import { TicketEntity } from "src/ticket/ticket.entity"
import {MotivoEntity} from "./motivo.entity";
import {FilaEsperaEntity} from "src/fila-espera/fila-espera.entity";
const shortid = require('shortid')

class Atendimento {
  dtinicio: Date;
  dtfim: Date;
}

@Entity('tatendimento')
export class AtendimentoEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  dtcriacao: Date;

  @Column({ type: 'json', nullable: true })
  jslista: Array<Atendimento>;

  @Column({ type: 'boolean', nullable: true, default: true })
  fgativo: boolean;

  @OneToOne(type => TicketEntity, ticket => ticket.cdatendimento, { onDelete: 'CASCADE' })
  cdticket: Number;

  @ManyToOne(type => UserEntity, user => user.cd, { onDelete: 'CASCADE' })
  @Index()
  cduser: Number;

  @ManyToOne(type => MotivoEntity, motivo => motivo.cd)
  @Index()
  cdmotivo: Number;

  @ManyToOne(type => OrigemEntity, origem => origem.cd)
  cdorigem: Number;
  
  @ManyToOne(type => ChaveEntity, chave => chave.cd)
  @Index()
  cdchave: Number;
  
  @Column({ type: 'timestamp', nullable: true })
  @Index()
  dtinicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Index()
  dtfim: Date;
  
  @OneToOne(type => FilaEsperaEntity, filaEspera => filaEspera.cd, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  cdfila: number;

  @RelationId((atendimento: AtendimentoEntity) => atendimento.cdorigem)
  _cdorigem: Number;

  @RelationId((atendimento: AtendimentoEntity) => atendimento.cdchave)
  _cdchave: Number;

  @RelationId((atendimento: AtendimentoEntity) => atendimento.cdmotivo)
  _cdmotivo: Number;

  @RelationId((atendimento: AtendimentoEntity) => atendimento.cduser)
  _cduser: Number;

  @RelationId((atendimento: AtendimentoEntity) => atendimento.cdticket)
  _cdticket: number;

  get tempoTotal () {
    return this.jslista.reduce((prev, current) => {
      const d1 = new Date(current.dtinicio)
      const d2 = new Date(current.dtfim)
      return prev + (d2.getTime() - d1.getTime())
    }, 0)
  }
}
