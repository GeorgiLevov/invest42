import { User } from './../data/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Req, Body, Put, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { Roles } from 'src/common';
import { Client } from '../data/entities/client.entity';

@Controller('user')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('assign-to-manager')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  addClientToManager(@Body() body: any): Promise<object> {

    return this.usersService.addClientToManager(body.managerEmail, body.clientEmail);
  }

  @Put('status/toggle')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  archiveUser(@Body() body: any): Promise<object> {
    return this.usersService.toggleArchiveUser(body.email);
  }

  @Get('profile/:email')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(AuthGuard())
  getProfile(@Param() params): Promise<object> {
    return this.usersService.getManager(params.email);
  }

  @Post('update')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  updateManager(@Body() body: any): Promise<object> {
    return this.usersService.updateManager(body.id, body.manager);
  }

  @Get('admins')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getAdmins(): Promise<User[]> {
    return this.usersService.getAdmins();
  }

  @Get('managers')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getManagers(): Promise<User[]> {
    return this.usersService.getManagers();
  }

  @Get('clients')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getClients(): Promise<Client[]> {
    return this.usersService.getClients();
  }

  @Get('get-client-manager/:email')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getClientManager(@Param() params): Promise<User> {
    return this.usersService.getClientsManager(params.email);
  }

  @Get('get-client-info')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getClientInfo(): Promise<any[]> {
    return this.usersService.getClientEditInfo();
  }

}
