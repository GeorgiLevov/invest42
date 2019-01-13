import { WatchlistController } from './services/watchlist/watchlist.controller';
import { WatchlistService } from './services/watchlist/watchlist.service';
import { Funds } from './../../data/entities/funds.entity';
import { Status } from './../../data/entities/status.entity';
import { Company } from './../../data/entities/company.entity';
import { Watchlist } from './../../data/entities/watchlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { User } from './../../data/entities/user.entity';
import { FileService } from './file.service';
import { Order } from 'src/data/entities/order.entity';
import { OrderService } from './services/order.service';
import { CompaniesService } from './services/companies.service';
import { Industry } from 'src/data/entities/industry.entity';
import { FundsService } from './services/funds.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Industry, Watchlist, Order, Status, Funds])],
  providers: [UsersService, FileService, CompaniesService, OrderService, WatchlistService, FundsService],
  controllers: [WatchlistController],
  exports: [UsersService, FileService, CompaniesService, OrderService, FundsService],
})
export class CoreModule { }
