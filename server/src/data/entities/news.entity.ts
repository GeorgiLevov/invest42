import { Company } from './company.entity';
import { User } from '../../data/entities/user.entity';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity({
    name: 'news',
  })
  export class News {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    datePublished: Date;

    @Column()
    author: string;

    @ManyToOne(type => Company, company => company.news)
    company: Company;

}