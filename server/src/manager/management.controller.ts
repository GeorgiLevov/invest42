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

    @Get('activeOrders/:id')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getAllActiveClientOrders(@Param() params): Promise<Order[]> {
        return this.managementService.getAllActiveClientOrders(params.id);
    }

    @Get('closedOrders/:id')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getAllClosedClientOrders(@Param() params): Promise<Order[]> {
        return this.managementService.getAllClosedClientOrders(params.id);
    }

    @Post('watchlist/add')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    addToClientWatchlist(@Body() info): Promise<object> {
        return this.managementService.addCompanyToWatchlist(info.clientId, info.companyId);
    }

    @Get('market')
    @Roles(Role.manager)
    getClientMarket(): Promise<object> {
        return this.managementService.getMarketInfo();
    }

    @Get('watchlist/:clientId')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getClientWatchlist(@Param() info): Promise<object> {
        return this.managementService.getClientWatchlist(info.clientId);
    }

    @Post('watchlist/remove')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    removeFromClientWatchlist(@Body() info): Promise<object> {
        return this.managementService.removeCompanyFromWatchlist(info.clientId, info.companyId);
    }

    @Post('balance/update')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    updateBalance(@Body() info): Promise<object> {
        return this.managementService.updateBalance(info.id, info.balance);
    }

    @Post('units/update')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    updateUnits(@Body() info): Promise<object> {
        return this.managementService.updateOrder(info.id, info.units, info.clientId, info.buyprice);
    }

    @Post('update')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    updateClient(@Body() info): Promise<object> {
        return this.managementService.updateClient(info.id, info.email, info.address);
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
        // return this.managementService.buyStock(info.orderId);
        return this.managementService.clientBuyOrder(info);
    }

    @Post('sell')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    sellStock(@Body() info): Promise<object> {
        return this.managementService.sellStock(info.orderId);
    }

    @Post('notify')
    notifyManager(@Body() info): object {
        this.managementService.mail(info.stockName);
        return { result: 'Successfully notified client!' };
    }

    @Get('old-data')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    getLastMinuteDate(): Promise<object[]> {
        return this.managementService.getLastMinuteData();
    }

    // @Get('investments')
    // @Roles(Role.manager)
    // @UseGuards(AuthGuard(), RolesGuard)
    // ivestments(@Body() info: Array<any>): Promise<object> {
    //     return this.managementService.sellStock(info.orderId);
    // }
}