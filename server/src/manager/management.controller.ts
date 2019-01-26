import { ManagementService } from './../common/core/management.service';
import { Client } from '../data/entities/client.entity';
import { OverviewService } from '../common/core/overview.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../common/core/users.service';
import { Roles, RolesGuard } from 'src/common';
import { Role } from '../models/enums/roles.enum';
import { Order } from '../data/entities/order.entity';

@Controller('client')
export class ManagementController {

    constructor(
        private readonly managementService: ManagementService,
    ) { }

    @Get('portfolio/:id')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getClientInfo(@Param() params): Promise<Client> {
        return this.managementService.getClientPortfolio(params.id);
    }

    @Get('activeOrders')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getAllActiveClientOrders(@Body() client): Promise<Order[]> {
        return this.managementService.getAllActiveClientOrders(client.email);
    }

    @Post('watchlist/add')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    addToClientWatchlist(@Body() info): Promise<object> {
        return this.managementService.addCompanyToWatchlist(info.email, info.companyname);
    }

    @Get('market')
    @Roles(Role.manager)
    getClientMarket(): Promise<object> {
        return this.managementService.getClientMarket();
    }

    @Get('watchlist')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getClientWatchlist(@Body() info): Promise<object> {
        return this.managementService.getClientWatchlist(info.email);
    }

    @Post('watchlist/remove')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    removeFromClientWatchlist(@Body() info): Promise<object> {
        return this.managementService.removeCompanyFromWatchlist(info.email, info.companyname);
    }

    @Post('balance/update')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    updateBalance(@Body() info): Promise<object> {
        return this.managementService.updateBalance(info.id, info.balance);
    }

    @Get('open-companies')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getOpenCompanies(@Body() info): Promise<object> {
        return this.managementService.getOpenCompanies();
    }

    @Get('company/news')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getNewsForSpecificCompany(@Body() info): Promise<object> {
        return this.managementService.getNewsForSpecificCompany(info.companyName);
    }

    @Post('buy')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    buyStock(@Body() info): Promise<object> {
        return this.managementService.buyStock(info.orderId);
    }

    @Post('sell')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    sellStock(@Body() info): Promise<object> {
        return this.managementService.sellStock(info.orderId);
    }

}
