import { News } from './../../data/entities/news.entity';
import { BasicStatus } from './../../models/enums/basicstatus.enum';
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

        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,

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

    async getClientWatchlist(clientEmail: string): Promise<Company[]> {

        const foundClient = await this.clientsRepository.findOne({ email: `${clientEmail}` });

        if (!foundClient) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        return await foundClient.watchlist;
    }

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

    async removeCompanyFromWatchlist(clientEmail: string, companyName: string): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ email: `${clientEmail}` });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        const foundCompany = await this.companyRepository.findOne({ name: `${companyName}` });

        if (!foundCompany) {
            throw new HttpException('There is no such company!', HttpStatus.NOT_FOUND);
        }

        const watchlist = await clientFound.watchlist;

        let index = -1;
        watchlist.forEach((company, idx) => {
            if (company.name === foundCompany.name) {
                index = idx;
            }
        });
        if (index === -1) {
            throw new HttpException('There is no such company in client list!', HttpStatus.NOT_FOUND);
        }
        clientFound.watchlist = Promise.all(watchlist.splice(index, 1));
        await this.clientsRepository.save(clientFound);
        // console.log(clientFound);

        return { result: 'Company was successfully removed from client watchlist!' };
    }

    async updateBalance(clientEmail: string, balance: number): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ email: `${clientEmail}` });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        await this.clientsRepository.update(clientFound.id, { availableBalance: clientFound.availableBalance + balance });

        return { result: 'Balance was updated successfully!' };
    }

    async getOpenCompanies(): Promise<Company[]> {

        const foundCompanies = await this.companyRepository.find({ status: BasicStatus.active });

        return foundCompanies;
    }

    async getNewsForSpecificCompany(companyName: string): Promise<News[]> {

        const foundCompany = await this.companyRepository.findOne({ name: `${companyName}` });

        return await foundCompany.news;
    }

    async buyStock(orderId: string): Promise<object> {

        const foundCompany = await this.ordersRepository.findOne({ id: `${orderId}` });

        await this.ordersRepository.update(foundCompany.id, { status: OrderStatus.closed });

        return { result: 'Successfully bought stock!' };
    }

    async sellStock(orderId: string): Promise<object> {

        const foundCompany = await this.ordersRepository.findOne({ id: `${orderId}` });

        await this.ordersRepository.update(foundCompany.id, { status: OrderStatus.sold });

        return { result: 'Successfully sold stock!' };
    }

}