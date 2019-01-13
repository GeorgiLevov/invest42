import { Watchlist } from './../../../../data/entities/watchlist.entity';
import { User } from './../../../../data/entities/user.entity';
import { Company } from './../../../../data/entities/company.entity';
import { WatchlistService } from './watchlist.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class WatchlistController {

    constructor(private readonly watchlistService: WatchlistService) {}

@Get('watchlist')
async getWatchlist(): Promise<Company[]> {
    // for testing purposes - this will be taken from the body
    const client = new User();
    client.id = 'c304d9aa-fc3e-4945-af93-1fa81a743b64';
    //
    return await this.watchlistService.getCompanies(client.id);
}

@Get('watchlist/addcompany')
async addCompany(): Promise<object> {
    // for testing purposes
    const company1 = new Company();
    company1.id = 'newcompanyid';
    company1.name = 'newcompanyname';
    company1.closedate = new Date();
    //
    return await this.watchlistService.addCompany(company1);
}

@Get('watchlist/removecompany')
async removeCompany(): Promise<object> {
    // for testing purposes - this will be taken from the body
    const company1 = new Company();
    company1.id = 'newcompanyid';
    company1.name = 'newcompanyname';
    company1.closedate = new Date();
    //
    return await this.watchlistService.removeCompany(company1.id);
}

}
