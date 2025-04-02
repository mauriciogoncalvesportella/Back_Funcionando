import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Timestamp, Unique, ManyToOne} from "typeorm";
import {UserEntity} from "src/user/user.entity";
@Entity('ttabela')
@Unique(['cduser', 'nmtable'])
export class TableEntity {
  @PrimaryGeneratedColumn()
  cd: Number;

  @CreateDateColumn({ type: 'timestamp' })
  dtcreation: Timestamp;

  @Column('varchar', { length: 255 })
  nmtable: String;
  
  @Column('json')
  jscontent: Object;

  @ManyToOne(type => UserEntity, user => user.cd)
  cduser: Number;
}
