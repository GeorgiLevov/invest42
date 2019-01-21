import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-route.module';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { ManagersListComponent } from './managers-list/managers-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { MaterializeWrapModule } from '../materialize-module/materialize.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-modal/edit.dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminsListComponent,
    ManagersListComponent,
    ClientsListComponent,
    UserRegisterComponent,
    ClientRegisterComponent,
    AdminComponent,
    EditDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MaterializeWrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EditDialogComponent,
  ],
})
export class AdminModule { }
