import { UserRegisterDTO } from './../../models/user/user-register.dto';
import { Company } from '../../data/entities/company.entity';
import { Client } from '../../data/entities/client.entity';
import { User } from 'src/data/entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/models/enums/status.enum';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    ) { }

  async getAllCompanies(): Promise<Company[]> {
    const companiesOnMarket = await this.companyRepository.find({ where: { status: Status.active } });
    return companiesOnMarket;
  }

  async getAllClients(user: User): Promise<Client[]> {
    const managerFound = await this.usersRepository.findOne( { where: { email: user.email} } );
    if (!managerFound){
      throw new HttpException('Manager account not found', HttpStatus.BAD_REQUEST);
    }

    const assignedClients = await this.clientsRepository.find({ where: { managerId: managerFound.id , status: Status.active } });
    if (!assignedClients){
      throw new HttpException('No clients found', HttpStatus.BAD_REQUEST);
    }
    if (assignedClients.length < 1){
      throw new HttpException('You have no assigned clients.', HttpStatus.BAD_REQUEST);
    }
    return assignedClients;
  }

}