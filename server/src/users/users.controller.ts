import { User } from 'src/data/entities/user.entity';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Req, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { Roles } from 'src/common';
import { GetClientDTO } from './../models/user/client-get.dto';

@Controller('user')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('')
  // @UseGuards(AuthGuard(), AdminGuard)
  all() {
    return this.usersService.getAll();
  }

  @Put('assign-to-manager')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  addClientToManager(@Body() body: any): Promise<object> {

    return this.usersService.addClientToManager(body.manageremail, body.clientemail);
  }

  @Put('archive')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  archiveUser(@Body() body: any): Promise<object> {
    return this.usersService.archiveAnyUser(body.email);
  }

}
