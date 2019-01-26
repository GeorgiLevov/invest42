import { Price } from './../../data/entities/prices.entity';
import { News } from './../../data/entities/news.entity';
import { BasicStatus } from './../../models/enums/basicstatus.enum';
import { Order } from './../../data/entities/order.entity';
import { Company } from '../../data/entities/company.entity';
import { Client } from '../../data/entities/client.entity';
import { User } from 'src/data/entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { OrderStatus } from '../../models/enums/orderstatus.enum';

@Injectable()
export class ManagementService {

    constructor(

        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,

        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,

    ) { }

    async getClientPortfolio(clientId: string): Promise<Client> {
        const clientPortfolio = await this.clientsRepository.findOne({ id: `${clientId}` });

        if (!clientPortfolio) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        return clientPortfolio;
    }

    async getAllActiveClientOrders(clientId: string): Promise<Order[]> {
        // const clientActiveOrders = await this.clientsRepository.findOne({ id: `${clientId}` });
        const orders = await this.clientsRepository.query(
            `SELECT
            DISTINCT
            c.id,
            c.name,
            c.abbr,
            c.icon,
            c.ceo,
            c.address,
            c.industry,
            o.opendate,
            o.closedate,
            o.buyprice,
            o.sellprice,
            o.units,
            o.status
        FROM companies as c
        JOIN orders as o ON c.id = o.companyId
        JOIN clients as cl ON ${clientId} = o.clientId;`,
        );

        // if (!clientActiveOrders) {
        //     throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        // }

        // const activeOrders = await clientActiveOrders.orders;

        // const orders = activeOrders.filter((order) => {
        //     return order.status === OrderStatus.open;
        // });

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
        // tslint:disable-next-line:no-console
        console.log(clientFound);
        await this.clientsRepository.save(clientFound);

        return { result: 'Company was successfully removed from client watchlist!' };
    }

    async updateBalance(clientId: string, balance: number): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ id: `${clientId}` });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        await this.clientsRepository.update(clientFound.id, { availableBalance: clientFound.availableBalance + balance });

        return { result: 'Balance was updated successfully!' };
    }

    async updateClient(clientId, newEmail, newAddress): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ id: `${clientId}` });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        await this.clientsRepository.update(clientFound.id, { email: newEmail, address: newAddress });

        return { result: 'Successfully updated client information!' };
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

        await this.ordersRepository.update(foundCompany.id, { status: OrderStatus.open });

        return { result: 'Successfully bought stock!' };
    }

    async sellStock(orderId: string): Promise<object> {

        const foundCompany = await this.ordersRepository.findOne({ id: `${orderId}` });

        await this.ordersRepository.update(foundCompany.id, { status: OrderStatus.closed });

        return { result: 'Successfully sold stock!' };
    }

    async getClientMarket(): Promise<object> {
        const foundCompanies = await this.companyRepository.find({ select: ['name', 'abbr', 'industry'] });
        if (!foundCompanies) {
            throw new HttpException('No companies found', HttpStatus.BAD_REQUEST);
        }

        const orders = await getManager().query(`SELECT companies.name,
        prices.opendate,
        prices.startprice,
        prices.endprice,
        prices.highprice,
        prices.lowprice
        FROM prices
        JOIN companies ON prices.companyId = companies.id
        WHERE prices.opendate
        BETWEEN NOW() - interval 60 minute AND NOW()
        LIMIT 10;`);
        return { result: orders };
    }

}