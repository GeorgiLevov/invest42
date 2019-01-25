import { Company } from './../../data/entities/company.entity';
import { Price } from './../../data/entities/prices.entity';
import { Order } from './../../data/entities/order.entity';
import { UserRegisterDTO } from './../../models/user/user-register.dto';
import { Client } from '../../data/entities/client.entity';
import { User } from 'src/data/entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicStatus } from 'src/models/enums/basicstatus.enum';
import { OrderStatus } from 'src/models/enums/orderstatus.enum';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Price)
    private readonly pricesRepository: Repository<Price>,

  ) { }

  async getAllCompanies(): Promise<Company[]> {
    const companiesOnMarket = await this.companyRepository.find({ where: { status: BasicStatus.active } });

    if (!companiesOnMarket) {
      throw new HttpException('No companies found!', HttpStatus.NOT_FOUND);
    }

    return companiesOnMarket;
  }

  async companyDetais(companyId: string): Promise<Company> {
    // console.log(companyId);
    const foundCompany: Company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!foundCompany) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return foundCompany;
  }

  async getCompaniesAndPrices(): Promise<object> {
    const companiesOnMarket = await this.companyRepository.find({ where: { status: BasicStatus.active } });

    const companyPrices = await this.pricesRepository.find({
      order: { opendate: 'DESC' },
      relations: ['company'],
      take: companiesOnMarket.length,
    });

    const toREturn = { companies: companiesOnMarket, prices: companyPrices };
    return toREturn;
  }

  async getCompanyPrices(companyId): Promise<object[]> {

    const prices = [];
    const companyPrices = await this.pricesRepository.query(`
        SELECT
            p.id,
            p.opendate,
            p.startprice,
            p.endprice,
            p.highprice,
            p.lowprice
        FROM
            prices AS p
        WHERE
            p.companyId = ${companyId} AND (p.id % 250) = 0;`);

    companyPrices.forEach((price) => {
      const newDate = price.opendate.toISOString().slice(0, 10);

      const obj = {
        date: newDate,
        open: `${price.startprice}`,
        high: `${price.endprice}`,
        low: `${price.lowprice}`,
        close: `${price.highprice}`,
      };
      prices.push(obj);

    });

    return prices;
  }

  async getAllClients(user: User): Promise<Client[]> {
    const managerFound = await this.usersRepository.findOne({ where: { email: user.email } });
    if (!managerFound) {
      throw new HttpException('Manager account not found', HttpStatus.BAD_REQUEST);
    }

    const assignedClients = await this.clientsRepository.find({ where: { manager: managerFound.id, status: BasicStatus.active } });
    // console.log(assignedClients);
    if (!assignedClients) {
      throw new HttpException('No clients found', HttpStatus.BAD_REQUEST);
    }
    if (assignedClients.length < 1) {
      throw new HttpException('You have no assigned clients.', HttpStatus.BAD_REQUEST);
    }
    return assignedClients;
  }

  async getAllClientsOrders(manager: User): Promise<Order[][]> {
    const allClients = await this.getAllClients(manager);

    return await Promise.all(allClients.map(client => client.orders));
  }

  async getAllClientWithOrders(manager: User): Promise<Client[]> {
    return await this.getAllClients(manager);
  }

  async getClientOrdersHistory(manager: User): Promise<Order[][]> {
    const allClientsOrders = await this.getAllClientsOrders(manager);

    return await Promise.all(allClientsOrders.map((orders) => orders.filter(order => order.status === OrderStatus.sold)));
  }

  // PLEASE LOOK AT THIS !!!
  // this can be downgraded to a promise
  // get names with observable
  // async getClientsByName(nameQuery: string): Promise<any>{
  //   const clientsFound = await this.clientsRepository.find({where: { fullname: nameQuery} } );
  //   if (!clientsFound){
  //     throw new HttpException('No clients found', HttpStatus.BAD_REQUEST);
  //   }
  //   // Delay each item by time and project value;
  //   const source: Observable<string[]> = from(clientsFound)
  //     .map( (client) => of(client.fullname) )
  //     .debounce(1000 /* ms */);

  //   return source.subscribe((returnedName) => returnedName );

  // }

}