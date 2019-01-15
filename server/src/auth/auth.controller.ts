import { ClientRegisterDTO } from './../models/user/client-register.dto';
import { RolesGuard } from './../common';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { Roles } from '../common';
import { FileService } from '../common/core/file.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, FileInterceptor,
  UseInterceptors, UploadedFile, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import { unlink } from 'fs';

@Controller('')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Get('returnroot')
  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RolesGuard)
  root(): string {
    return 'root';
  }

  @Post('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<object> {
    const generatedToken = await this.authService.signIn(user);
    if (!generatedToken) {
      throw new BadRequestException('Wrong credentials!');
    }

    return {token: generatedToken} ;
  }

  @Post('register/user')
  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('avatar', {
    limits: FileService.fileLimit(1, 2 * 1024 * 1024),
    storage: FileService.storage(['public', 'images']),
    fileFilter: (req, file, cb) => FileService.fileFilter(req, file, cb, '.png', '.jpg'),
  }))
  async registerUser(
    @Body()
    user: UserRegisterDTO,

    @UploadedFile()
    file,
  ): Promise<string> {
    const folder = join('.', 'public', 'uploads');
    if (!file) {
      user.avatar = join(folder, 'default.png');
    } else {
      user.avatar = join(folder, file.filename);
    }

    try {
      await this.usersService.registerUser(user);
      return `${user.role}: ${user.fullname} is now registered.`;
    } catch (error) {
      await new Promise((resolve, reject) => {

        // Delete the file if user not found
        if (file) {
          unlink(join('.', file.path), (err) => {
            if (err) {
              reject(error.message);
            }
            resolve();
          });
        }

        resolve();
      });

      return (error.message);
    }
  }

  @Post('register/client')
  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('avatar', {
    limits: FileService.fileLimit(1, 2 * 1024 * 1024),
    storage: FileService.storage(['public', 'images']),
    fileFilter: (req, file, cb) => FileService.fileFilter(req, file, cb, '.png', '.jpg'),
  }))
  async registerClient(
    @Body()
    client: ClientRegisterDTO,
    @UploadedFile()
    file,
  ): Promise<string> {
    const folder = join('.', 'public', 'uploads');
    if (!file) {
      client.icon = join(folder, 'default.png');
    } else {
      client.icon = join(folder, file.filename);
    }
    try {
      await this.usersService.registerClient(client);
      return `Client: ${client.fullname} is now registered.`;
    } catch (error) {
      await new Promise((resolve, reject) => {

        // Delete the file if user not found
        if (file) {
          unlink(join('.', file.path), (err) => {
            if (err) {
              reject(error.message);
            }
            resolve();
          });
        }

        resolve();
      });

      return (error.message);
    }
  }
}
