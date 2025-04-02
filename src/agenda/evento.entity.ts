import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, Index, RelationId } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import {TipoAgendamentoEntity} from "./tipoagendamento.entity";
import {ChaveEntity} from "src/chave/chave.entity";

export class Recorrencia {
  constructor (
    public id: string,
    public list: Array<number>,
    public inicio: string,
    public fim: string,
  ) {  }
}

@Entity('tevento')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @Column('varchar')
  nmtitulo: string;

  @Column('varchar', { nullable: true })
  nmlocal: string;

  @Column('text')
  mmdesc: string;

  @Column('boolean', { default: false })
  fgcadeado: boolean;

  @Column('boolean')
  fgcobrarvisita: boolean;

  @Column('boolean')
  fgconfirmado: boolean;

  @Column('boolean')
  fgdiatodo: boolean;

  @Column('boolean')
  @Index()
  fgrecorrente: boolean;

  @Column('timestamp', { nullable: true })
  dtinicio: Date;

  @Column('timestamp', { nullable: true })
  dtfim: Date;

  @Column('timestamp', { nullable: true })
  dtrealizadoinicio: Date;

  @Column('timestamp', { nullable: true })
  dtrealizadofim: Date;

  @Column('integer', { nullable: true })
  @Index()
  indexdtinicio: number;

  @Column('integer', { nullable: true })
  @Index()
  indexdtfim: number;

  @Column('varchar', { nullable: true })
  nmcontato: string;

  @Column('varchar', { nullable: true })
  idtelefone: string;

  @Column('json', { nullable: true })
  jsrecorrencia: Recorrencia;

  @Column('int', { nullable: true })
  cdeventorecorrente: number;

  @ManyToOne(type => TipoAgendamentoEntity, tipoAgendamento => tipoAgendamento.cd)
  cdtipoagendamento: number;

  @ManyToOne(type => ChaveEntity, chave => chave.cd, { nullable: true })
  cdchave: number;

  @ManyToOne(type => UserEntity, user => user.cd)
  cdresponsavel: number;

  @ManyToMany(type => UserEntity, entity => entity.eventos)
  @JoinTable()
  users: UserEntity[];

  @RelationId((evento: EventoEntity) => evento.cdtipoagendamento)
  _cdtipoagendamento: number;

  @RelationId((evento: EventoEntity) => evento.cdchave)
  _cdchave: number;

  @RelationId((evento: EventoEntity) => evento.users)
  _cdusers: number[];

  @RelationId((evento: EventoEntity) => evento.cdresponsavel)
  _cdresponsavel: number;
}
