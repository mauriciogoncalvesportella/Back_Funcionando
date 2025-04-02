import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";
import {TicketEntity} from "./ticket.entity";

@Entity('tsituacao')
export class SituacaoEntity {
  @PrimaryGeneratedColumn()
  cd: number;

  @OneToMany(type => TicketEntity, ticket => ticket.cdsituacao)
  tickets: TicketEntity[];

  @Column('varchar')
  nmsituacao: string;

  @Column('smallint', { nullable: true })
  nordem: number;

  @Column('varchar')
  idicon: string;
}
