import { ManagementService } from './../common/core/management.service';
import { Client } from '../data/entities/client.entity';
import { Company } from '../data/entities/company.entity';
import { OverviewService } from '../common/core/overview.service';
import { User } from 'src/data/entities/user.entity';
import { AdminGuard } from '../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Req, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from '../common/core/users.service';
import { Roles, RolesGuard } from 'src/common';
import { GetClientDTO } from '../models/user/client-get.dto';
import { Role } from '../models/enums/roles.enum';
import { Order } from '../data/entities/order.entity';

@Controller('client')
export class ManagementController {

    constructor(
        private readonly usersService: UsersService,
        private readonly overviewService: OverviewService,
        private readonly managementService: ManagementService,
    ) { }

    @Get('portfolio')
    @Roles(Role.admin)
    @UseGuards(AuthGuard(), RolesGuard)
    getClientInfo(@Body() client): Promise<Client> {
        return this.managementService.getClientPortfolio(client.email);
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
        return this.managementService.addCompanyToWatchlist(info.email, info.companyName);
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
        return this.managementService.removeCompanyFromWatchlist(info.email, info.companyName);
    }

    @Post('balance/update')
    @Roles(Role.manager)
    @UseGuards(AuthGuard(), RolesGuard)
    updateBalance(@Body() info): Promise<object> {
        return this.managementService.updateBalance(info.email, info.balance);
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

}
