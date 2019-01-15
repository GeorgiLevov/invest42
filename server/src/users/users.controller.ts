import { User } from 'src/data/entities/user.entity';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Req, Body, Put, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { Roles } from 'src/common';
import { ManagerUpdateDTO } from './../models/user/update-manager.dto';

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

  @Put('status/toggle')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  archiveUser(@Body() body: any): Promise<object> {
    return this.usersService.toggleArchiveUser(body.email);
  }

  @Get('profile')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  getProfile(@Body() body: any): Promise<object> {
    return this.usersService.getManager(body.email);
  }

  @Post('update')
  @Roles('ADMIN')
  @UseGuards(AuthGuard())
  updateManager(@Body() body: any): Promise<object> {
    return this.usersService.updateManager(body.email, body.manager);
  }

}
