import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
import { Company } from './company.entity';
import { Status } from './../../models/enums/status.enum';

@Entity({
    name: 'clients',
  })
  export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    availableBalance: number;

    @Column()
    icon: string;

    @ManyToOne(type => User, user => user.clients)
    manager: User;

    @OneToMany(type => Order, order => order.client)
    orders: Promise<Order[]>;

    @ManyToMany(type => Company, company => company.clients, { eager: true, cascade: true})
    @JoinTable()
    watchlist: Promise<Company[]>;

    @Column({enum: [Status.active, Status.acrhived], type: 'enum', default: Status.active})
    status: string;

  }
