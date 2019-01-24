import { UnauthorisedComponent } from './shared/core/errors/unauthorised/unauthorised.component';
import { ManagerGuard } from './shared/core/authentication/manager-guard.service';
import { AdminGuard } from './shared/core/authentication/admin-guard.service';

import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared/core/errors/not-found/not-found.component';
import { RoleGuard } from './shared/core/authentication/role-guard.service';

const routes: Routes = [
    {
        path: '', component: LoginComponent, canActivate: [RoleGuard], data: { animation: { value: '' } },
    },
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule',
         canActivate: [AdminGuard],
          data: { animation: { value: 'admin' } },
    },
    {
        path: 'manager', loadChildren: './manager/manager.module#ManagerModule',
         canActivate: [ManagerGuard],
          data: { animation: { value: 'manager' } },
    },
    {
        path: 'unauthorised', component: UnauthorisedComponent,
    },
    {
        path: '**', component: NotFoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
