import { BasicStatus } from '../../models/enums/basicstatus.enum';
import { Role } from './../../models/enums/roles.enum';
import { Client } from './client.entity';

import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({enum: [Role.admin, Role.manager], type: 'enum'})
  role: string;

  @Column()
  avatar: string;

  @OneToMany(type => Client, client => client.manager, {cascade: true})
  clients: Client[];

  @Column({enum: [BasicStatus.acrhived, BasicStatus.active], type: 'enum', default: BasicStatus.active})
  status: string;

  // @OneToOne(type => Funds, funds => funds.client, { eager: true})
  // @JoinColumn()
  // funds: Funds;

  // @Column()
  // dateregistered: Date;
}
