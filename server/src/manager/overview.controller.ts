import { Order } from './../data/entities/order.entity';
import { Client } from './../data/entities/client.entity';
import { Company } from './../data/entities/company.entity';
import { OverviewService } from './../common/core/overview.service';
import { User } from 'src/data/entities/user.entity';
import { AdminGuard } from '../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Req, Body, Put, Delete, Query, Param } from '@nestjs/common';
import { UsersService } from '../common/core/users.service';
import { Roles, RolesGuard } from 'src/common';
import { GetClientDTO } from '../models/user/client-get.dto';

@Controller('view')
export class OverviewController {

  constructor(
    private readonly usersService: UsersService,
    private readonly overviewService: OverviewService,
  ) { }

  @Get('market')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getAllCompanies(): Promise<Company[]> {
    return this.overviewService.getAllCompanies();
  }

  @Get('clients')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getClients(@Req() request): Promise<Client[]> {
    const user = request.user;
    return this.overviewService.getAllClients(user);
  }

  @Get('client/portfolio:id')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getClientPortfolio(@Req() request): Promise<Client[]> {
    const user = request.user;
    return this.overviewService.getAllClients(user);
  }

  // not tested
  @Get('clients/orders')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getAllClientsOrders(@Req() request): Promise<Order[][]> {
    const user = request.user;
    return this.overviewService.getAllClientsOrders(user);
  }

  @Get('clients/orders/sold')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getClientOrdersHistory(@Req() request): Promise<Order[][]> {
    const user = request.user;
    return this.overviewService.getAllClientsOrders(user);
  }

  // @Get(':fullname')
  // findAll(@Param('fullname') fullname) {
  //   return this.overviewService.getClientsByName(fullname);
  // }

}
