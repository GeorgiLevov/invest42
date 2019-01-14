import { Client } from './../../data/entities/client.entity';
import { Company } from './../../data/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { User } from './../../data/entities/user.entity';
import { FileService } from './file.service';
import { Order } from 'src/data/entities/order.entity';
// import { OrderService } from './services/order.service';
// import { CompaniesService } from './services/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Order, Client])],

  providers: [UsersService, FileService],
  exports: [UsersService, FileService],
  // providers: [UsersService, FileService, CompaniesService, OrderService],
  // exports: [UsersService, FileService, CompaniesService],
})
export class CoreModule { }
