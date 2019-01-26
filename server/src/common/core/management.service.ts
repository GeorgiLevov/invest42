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
            o.status,
            o.id
        FROM companies as c
        JOIN orders as o ON c.id = o.companyId
        JOIN clients as cl ON ${clientId} = o.clientId;`,
        );

        return orders;
    }

    async getMarketInfo(): Promise<object[]> {
        const market = await this.companyRepository.query(
            `SELECT
            c.id,
            c.name,
            c.abbr,
            c.icon,
            c.ceo,
            c.address,
            c.industry,
            Max(p.opendate),
            p.startprice,
            p.endprice,
            p.highprice,
            p.lowprice,
            p.endprice as currentprice
        FROM companies as c
        JOIN prices as p ON c.id = p.companyId
        GROUP BY(c.id);`,
        );

        return market;
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

    async updateOrder(orderId: string, units: number): Promise<object> {

        const orderFound = await this.ordersRepository.findOne({ id: `${orderId}` });

        if (!orderFound) {
            throw new HttpException('There is no such order!', HttpStatus.NOT_FOUND);
        }

        await this.ordersRepository.update(orderFound.id, { units: orderFound.units + units });

        return { result: 'Units was updated successfully!' };
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

    async getClientMarket(): Promise<object> {  // THIS IS ANOTHER OPTION !!!
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

    async clientBuyOrder(orderInfo): Promise<object> {

        const clientFound = await this.clientsRepository.findOne({ id: orderInfo.clientId });

        if (!clientFound) {
            throw new HttpException('There is no such client!', HttpStatus.NOT_FOUND);
        }

        const orders = await clientFound.orders;

        let orderId = 0;
        orders.forEach((order: any) => {
            if (order.clientId === orderInfo.clientId &&
                order.companyId === orderInfo.companyId) {
                orderId = order.id;
            }
        });

        if (orderId) {
            const orderFound = await this.ordersRepository.findOne({ id: `${orderId}` });

            await this.ordersRepository.update(orderFound.id, { units: orderFound.units + orderInfo.quantity });
        } else {
            const order = {
                opendate: new Date(),
                closedate: new Date(),
                buyprice: orderInfo.currentprice,
                sellprice: orderInfo.sellprice,
                units: orderInfo.quantity,
                companyId: orderInfo.companyId,
                clientId: orderInfo.clientId,
            };
            const createOrder = this.ordersRepository.create(order);
            const newOrder = await this.ordersRepository.save(createOrder);

            const companyFound = await this.companyRepository.findOne({ id: orderInfo.companyId });

            const com = await companyFound.orders;
            com.push(newOrder);
            await this.companyRepository.save(companyFound);
            // console.log(newOrder);
            clientFound.orders.push(newOrder);
            await this.clientsRepository.save(clientFound);

        }

        return { result: 'Successfully buy stocks!' };
    }

}