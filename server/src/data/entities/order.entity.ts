import { Client } from './client.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { OrderStatus } from './../../models/enums/orderstatus.enum';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  opendate: Date;

  @Column({ nullable: true, default: null })
  closedate: Date;

  @Column()
  buyprice: number;

  @Column()
  sellprice: number;

  @Column()
  units: number;

  @ManyToOne(type => Client, client => client.orders)
  client: Promise<Client>;

  @Column({ enum: [OrderStatus.open, OrderStatus.closed, OrderStatus.sold], type: 'enum' })
  status: string;

  @ManyToOne(type => Company, company => company.orders)
  company: Promise<Company>;
}
