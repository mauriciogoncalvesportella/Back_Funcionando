import {Entity, ManyToOne, CreateDateColumn, RelationId, JoinColumn, Column, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ChaveEntity} from "./chave.entity";

@Entity('tchavefone')
@Unique(['fone'])
export class ChaveFoneEntity {
  @PrimaryGeneratedColumn()
  cd: Number;

  @Column({ length: 12  })
  fone: string;

  @Column({ length: 10, nullable: true })
  idnome: string;

  @ManyToOne(type => ChaveEntity, chave => chave.cd, { nullable: true })
  cdchave: number;

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Date;

  @RelationId((entity: ChaveFoneEntity) => entity.cdchave)
  _cdchave: number
}
