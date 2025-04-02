import { ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, Timestamp, OneToMany, ManyToMany, Unique, Index } from "typeorm";
import * as bcrypt from "bcryptjs";
import { AtendimentoEntity } from "src/atendimento/atendimento.entity";
import { TableEntity } from "src/table/table.entity";
import {TicketEntity} from "src/ticket/ticket.entity";
import {GrupoAcessoEntity} from "./grupoAcesso.entity";
import {Turno} from "./user.dto";
import {ServicoEntity} from "src/ticket/servico.entity";
import {AcaoEntity} from "src/ticket/acao.entity";
import {EventoEntity} from "src/agenda/evento.entity";
import {ChaveEntity} from "src/chave/chave.entity";

@Unique(['idemail'])
@Entity('tuser')
export class UserEntity {
  constructor (cd: number) {
    this.cd = cd
  }

  @PrimaryGeneratedColumn()
  cd: number;

  @Column({ length: 8, nullable: true})
  idRamal: string;

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Timestamp;

  @Column({
    type: 'varchar',
    unique: true,
  })
  idlogin: string;

  @Column({
    type: 'varchar',
  })
  idnome: string;

  @Column({
    type: 'varchar',
  })
  idemail: string;

  @Column('json', { nullable: true })
  jsturnos: Array<Turno>;

  @Column({ type: 'varchar' })
  idsenha: string;

  @Column({ type: 'varchar', nullable: true })
  idcolor: string;

  @OneToMany(type => ChaveEntity, chave => chave.cdresponsavel)
  chaves: ChaveEntity[]

  @ManyToOne(type => GrupoAcessoEntity, grupoAcesso => grupoAcesso.cd)
  grupoacesso: number;

  @OneToMany(type => ServicoEntity, servico => servico.cduser)
  servicos: ServicoEntity[];

  @OneToMany(type => AtendimentoEntity, atendimento => atendimento.cduser)
  atendimentos: AtendimentoEntity[];
  
  @OneToMany(type => TableEntity, table => table.cduser)
  tables: TableEntity[];

  @OneToMany(type => AcaoEntity, table => table.cduser)
  acoes: AcaoEntity[];

  @ManyToMany(type => TicketEntity, entity => entity.users)
  tickets: TicketEntity[];

  @ManyToMany(type => EventoEntity, entity => entity.users)
  eventos: EventoEntity[];

  @BeforeInsert()
  async hashSenha() {
    this.idsenha = await bcrypt.hash(this.idsenha, 10);
    return this.idsenha
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.idsenha);
  }
}
