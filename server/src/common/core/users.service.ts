import { ClientRegisterDTO } from './../../models/user/client-register.dto';
import { Client } from './../../data/entities/client.entity';
import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { User } from './../../data/entities/user.entity';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { validate } from 'class-validator';
import { BasicStatus } from '../../models/enums/basicstatus.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,

    ) { }

  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userFound) {
      throw new Error('User already exists!');
    }

    user.password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.create(user);

    const result = await this.usersRepository.save([user]);

    return result;
  }

  async registerClient(client: ClientRegisterDTO) {
    const clientFound = await this.clientsRepository.findOne({ where: { email: client.email } });
    if (clientFound) {
      throw new Error('Client already exists!');
    }
    await this.clientsRepository.create(client);
    const result = await this.clientsRepository.save([client]);
    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { email: payload.email } });
    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    // tslint:disable-next-line:max-line-length
    const userFound: GetUserDTO = await this.usersRepository.findOne({ select: ['email', 'password', 'role', 'fullname'], where: { email: user.email } });

    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAll() {
    return await this.usersRepository.find({});
  }

  async addClientToManager(managerEmail: string, clientEmail: string): Promise<object> {
    const managerFound = await this.usersRepository.findOne( { email: managerEmail }, { relations: ['clients']} );
    if (!managerFound){
      throw new HttpException('Manager with this e-mail does not exist', HttpStatus.BAD_REQUEST);
    }

    const clientFound = await this.clientsRepository.findOne( { where: { email: clientEmail } } );
    if (!clientFound){
      throw new HttpException('Client with this e-mail does not exist', HttpStatus.BAD_REQUEST);
    }

    if (clientFound.status === BasicStatus.acrhived){
      throw new HttpException('Client does not have an active account', HttpStatus.BAD_REQUEST);
    }
    managerFound.clients.push(clientFound);
    await this.usersRepository.save(managerFound);

    return { result: `Manager: ${managerFound.fullname} is assigned to Client: ${clientFound.fullname}`};

 }

 async archiveAnyUser(userEmail: string): Promise<object> {
   const clientFound = await this.clientsRepository.findOne ( {where: { email: userEmail} } );
   const userFound = await this.usersRepository.findOne( {where: {email: userEmail} } );

   if (!(clientFound || userFound)){
    throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
  }

   if (clientFound){
    if (clientFound.status === BasicStatus.acrhived){
      throw new HttpException('Client is already archived', HttpStatus.BAD_REQUEST);
    }

    clientFound.status = BasicStatus.acrhived;
    await this.clientsRepository.save(clientFound);
    return {result: `Client:${clientFound.fullname} was archived`};
  }

   if (userFound){
    if (userFound.status === BasicStatus.acrhived){
      throw new HttpException('User is already archived', HttpStatus.BAD_REQUEST);
    }

    userFound.status = BasicStatus.acrhived;
    await this.usersRepository.save(userFound);
    return {result: `User${userFound.fullname} was archived`};
  }
 }

}
