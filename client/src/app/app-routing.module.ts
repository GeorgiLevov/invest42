import { RoleGuard } from './shared/core/authentication/role-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [RoleGuard] },
    { path: 'manager', loadChildren: './manager/manager.module#ManagerModule', canActivate: [RoleGuard] },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
