import { Order } from './../data/entities/order.entity';
import { Client } from './../data/entities/client.entity';
import { Company } from './../data/entities/company.entity';
import { OverviewService } from './../common/core/overview.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req, Param, Query} from '@nestjs/common';
import { UsersService } from '../common/core/users.service';
import { Roles, RolesGuard } from 'src/common';

@Controller('view')
export class OverviewController {

  constructor(
    private readonly overviewService: OverviewService,
  ) { }

  @Get('market')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getAllCompanies(): Promise<Company[]> {
    return this.overviewService.getAllCompanies();
  }

  @Get('market/company')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  companyDetais(@Query() query: any): Promise<object> {
    console.log('params:', query);
    return this.overviewService.companyDetais(query.id);
  }

  @Get('market/prices')
  @Roles('MANAGER')
  @UseGuards(AuthGuard(), RolesGuard)
  getCompaniesAndPrices(): Promise<object> {
    return this.overviewService.getCompaniesAndPrices();
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

}
