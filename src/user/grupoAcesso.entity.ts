import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, OneToMany, Unique } from 'typeorm'
import {UserEntity} from './user.entity';

@Unique(['idnome'])
@Entity('tgrupoacesso')
export class GrupoAcessoEntity {
  @PrimaryGeneratedColumn()
  cd: Number;

  @CreateDateColumn({ type: 'timestamp' })
  dtcriacao: Date;

  @Column('varchar')
  idnome: String;

  @Column({
    type: 'varchar',
    default: 'mdi-account',
  })

  idicon: String;

  @Column('json')
  jsroles: Object;

  @OneToMany(type => UserEntity, user => user.grupoacesso)
  users: UserEntity[];
}
