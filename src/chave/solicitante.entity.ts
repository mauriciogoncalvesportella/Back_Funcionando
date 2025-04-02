import {Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";
import {ChaveEntity} from "./chave.entity";
import {TicketEntity} from "src/ticket/ticket.entity";

@Entity('tsolicitante')
@Unique(['idsolicitante', 'cdchave'])
export class SolicitanteEntity {
  @PrimaryGeneratedColumn()
  cd: Number;

  @Column('varchar')
  idsolicitante: string;

  @Column('varchar', { nullable: true })
  idgpacesso: string;

  @OneToMany(type => TicketEntity, ticket => ticket.cdsolicitante)
  tickets: TicketEntity[];

  @ManyToOne(type => ChaveEntity, chave => chave.cd)
  cdchave: Number;
}
