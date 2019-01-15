import { Order } from './../../data/entities/order.entity';
import { UserRegisterDTO } from './../../models/user/user-register.dto';
import { Company } from '../../data/entities/company.entity';
import { Client } from '../../data/entities/client.entity';
import { User } from 'src/data/entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../../models/enums/orderstatus.enum';

@Injectable()
export class ManagementService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,

    ) { }

    async getClientPortfolio(email: string): Promise<Client> {
        const clientPortfolio = await this.clientsRepository.findOne({ email: `${email}` });

        if (!clientPortfolio) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        return clientPortfolio;
    }

    async getAllActiveClientOrders(email: string): Promise<Order[]> {
        const clientActiveOrders = await this.clientsRepository.findOne({ email: `${email}` });

        if (!clientActiveOrders) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        const activeOrders = await clientActiveOrders.orders;

        const orders = activeOrders.filter((order) => {
            return order.status === OrderStatus.open;
        });

        return orders;
    }

    // async getCompanies(name: string): Promise<Company[]> {

    //     const foundCompany = await this.companyRepository.findOne({ name: `${name}` });

    //     if (!foundCompany) {
    //         throw new HttpException('There is no such company!', HttpStatus.NOT_FOUND);
    //     }

    //     return foundWatchlist.companies;
    // }

    async addCompanyToWatchlist(clientEmail: string, companyName: string): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ email: `${clientEmail}` });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        const foundCompany = await this.companyRepository.findOne({ name: `${companyName}` });

        if (!foundCompany) {
            throw new HttpException('There is no such company!', HttpStatus.NOT_FOUND);
        }

        const clientWatchlist = await clientFound.watchlist;
        if (clientWatchlist.includes(foundCompany)) {
            throw new HttpException('This company is already added!', HttpStatus.BAD_REQUEST);
        }

        clientWatchlist.push(foundCompany);
        clientFound.watchlist = Promise.all(clientWatchlist);
        await this.clientsRepository.save(clientFound);

        return { result: 'Company was successfully added to watchlist!' };
    }

    // async removeCompany(companyId: string): Promise<object> {
    //     try {
    //         const watchlistCompanies = await this.currentWatchlist.companies;
    //         const initialNumberOfCompanies = watchlistCompanies.length;

    //         for (const [index, company] of watchlistCompanies.entries()) {
    //             if (company.id === companyId) {
    //                 watchlistCompanies.splice(index, 1);
    //                 break;
    //             }
    //         }

    //         if (initialNumberOfCompanies === watchlistCompanies.length) {
    //             throw new HttpException('Company not found in watchlist', HttpStatus.NOT_FOUND);
    //         }
    //         // updating watchlist in service also in db
    //         await this.watchlistRepository.save(this.currentWatchlist);

    //         return { result: `Company with id:${companyId} has been removed from watchlist!` };
    //     } catch (error) {
    //         console.log(`error details: Error on method removeCompany\n`)
    //         console.log(`error message: ${error}`);
    //         throw new HttpException('Cannot remove company', HttpStatus.BAD_REQUEST);
    //     }

    // }

}