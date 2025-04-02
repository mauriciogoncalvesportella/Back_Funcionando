import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, RelationId} from "typeorm";
import {UserEntity} from "src/user/user.entity";
import {AcaoEntity} from "./acao.entity";

export class PeriodoServico {
  dtinicio: Date;
  dtfim: Date;
}

@Entity('tservico')
export class ServicoEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @ManyToOne(user => UserEntity, user => user.cd, { nullable: true })
  cduser: number;

  @Column({ type: 'numeric', nullable: true })
  ntotal: number; 

  @Column({ type: 'json', nullable: true })
  jslista: Array<PeriodoServico>;

  @Column({ type: 'timestamp', nullable: true })
  dtinicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  dtfim: Date;

  @RelationId((servico: ServicoEntity) => servico.cduser)
  _cduser: number;
}
