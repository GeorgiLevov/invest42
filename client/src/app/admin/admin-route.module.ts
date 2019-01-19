import { AdminComponent } from './admin.component';
import { AdminGuard } from './../shared/core/authentication/admin-guard.service';
import { RoleGuard } from './../shared/core/authentication/role-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { ManagersListComponent } from './managers-list/managers-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, canActivate: [AdminGuard], children: [
            { path: '', redirectTo: 'home' },
            { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
            { path: 'admin-list', component: AdminsListComponent, canActivate: [AdminGuard] },
            { path: 'manager-list', component: ManagersListComponent, canActivate: [AdminGuard] },
            { path: 'client-list', component: ClientsListComponent, canActivate: [AdminGuard] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
