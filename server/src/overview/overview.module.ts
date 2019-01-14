import { Client } from './../data/entities/client.entity';
import { OverviewService } from './../common/core/overview.service';
import { Company } from './../data/entities/company.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '../data/entities/user.entity';
import { OverviewController } from './overview.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Client]), CoreModule, AuthModule],
  providers: [OverviewService],
  exports: [],
  controllers: [OverviewController],
})
export class OverviewModule {}
