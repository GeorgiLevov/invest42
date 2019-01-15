import { Client } from './../../data/entities/client.entity';
import { Company } from './../../data/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { User } from './../../data/entities/user.entity';
import { FileService } from './file.service';
import { Order } from './../../data/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Order, Client])],

  providers: [UsersService, FileService],
  exports: [UsersService, FileService],
})
export class CoreModule { }
