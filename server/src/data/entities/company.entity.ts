import { BasicStatus } from './../../models/enums/status.enum';
import { Industry } from './../../models/enums/industry.enum';
import { Order } from './order.entity';
import { Price } from './prices.entity';
import { Client } from './client.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { News } from './news.entity';

@Entity({
  name: 'companies',
})
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  abbr: string;

  @Column({ default: '' })
  icon: string;

  @Column({ default: '' })
  ceo: string;

  @Column({ default: '' })
  address: string;

  @Column()
  startdate: Date;

  @Column({ enum: [BasicStatus.active, BasicStatus.acrhived], type: 'enum' })
  status: string;

  @OneToMany(type => News, news => news.company)
  news: Promise<News[]>;

  @Column({ enum: [Industry.tech, Industry.pharma, Industry.health, Industry.manufacturing, Industry.retail, Industry.goods], type: 'enum' })
  industry: string;

  @OneToMany(type => Price, price => price.company)
  prices: Promise<Price[]>;

  @OneToMany(type => Order, order => order.company)
  orders: Promise<Order[]>;

  @ManyToMany(type => Client, client => client.watchlist)
  clients: Promise<Client[]>;
}
