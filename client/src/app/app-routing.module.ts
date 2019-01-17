import { RoleGuard } from './shared/core/authentication/role-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    },
    {
        path: 'manager', loadChildren: './manager/manager.module#ManagerModule',
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
