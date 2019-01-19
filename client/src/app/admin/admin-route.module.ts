import { AdminGuard } from './../shared/core/authentication/admin-guard.service';
import { RoleGuard } from './../shared/core/authentication/role-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAComponent } from '../admin/home/homeA.component';

const routes: Routes = [
    { path: '', component: HomeAComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
