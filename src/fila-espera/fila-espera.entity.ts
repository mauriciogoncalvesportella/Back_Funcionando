import { ChaveEntity } from "src/chave/chave.entity";
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne, JoinColumn, RelationId, BaseEntity } from "typeorm";
import { SolicitanteEntity } from "src/chave/solicitante.entity";
import { UserEntity } from "src/user/user.entity";
import { TicketEntity } from "src/ticket/ticket.entity";
import {AtendimentoEntity} from "src/atendimento/atendimento.entity";

@Entity('tfilaespera')
export class FilaEsperaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @ManyToOne(type => ChaveEntity, chave => chave.cd)
  @Index()
  cdchave: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  dtcriacao: Date;

  @Column({ type: 'timestamp', nullable: true })
  dtfinalizado: Date;

  @ManyToOne(type => SolicitanteEntity, solicitante => solicitante.cd)
  @Index()
  cdsolicitante: number;

  @ManyToOne(type => UserEntity, user => user.cd, { nullable: true })
  @Index()
  cduser: number;

  @Column({ type: 'text', nullable: true })
  mmobservacao: string;

  @OneToOne(type => AtendimentoEntity, atendimento => atendimento.cd, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  @Index()
  cdatendimento: number;

  @Column({ type: 'smallint', default: 0 })
  @Index()
  fgstatus: number;

  @Column({ type: 'boolean', default: false })
  fgurgente: boolean;

  @RelationId((entity: FilaEsperaEntity) => entity.cduser)
  _cduser: number;

  @RelationId((entity: FilaEsperaEntity) => entity.cdchave)
  _cdchave: number;

  @RelationId((entity: FilaEsperaEntity) => entity.cdsolicitante)
  _cdsolicitante: number;

  @RelationId((entity: FilaEsperaEntity) => entity.cdatendimento)
  _cdatendimento: number;

  async saveAndReload() {
    await this.save();
    await this.reload();
    return this;
  }
}
/*
CDFILA - chave sequencial
CDCLIENTE - selecionar o cliente
DATAHORA - Data e Hora do registro
SOLICITANTE - Pessoa que está solicitando o atendimento
CDPESSOA - Atendente que irá retornar a ligacao - Opcional
OBSERVACAO - Campo Memo Livre
FGSITUACAO - 1: Aberto  -  2: Atendido
CDTICKET - Ticket em que foi feito o atendimento
*/
