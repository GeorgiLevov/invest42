import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatToolbar, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { MzButtonModule, MzSidenavModule, MzSidenavComponent } from 'ngx-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from '../admin/admin-route.module';
import { ManagerRoutingModule } from './manager-route.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { RouterModule } from '@angular/router';
import { MaterializeWrapModule } from '../materialize-module/materialize.module';

@NgModule({
  declarations: [
    HomeComponent,
    ManagerComponent,
    OverviewComponent,
    ManageClientComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule
    MaterializeWrapModule,
  ],
  // exports: []
})
export class ManagerModule { }
