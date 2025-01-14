import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';
import { DatabaseModule } from './database/database.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    ManagerModule,
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
