import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAComponent } from '../admin/home/homeA.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
        path: '', component: OverviewComponent, children: [
            { path: '', redirectTo: 'market' },
            { path: 'market', component: HomeComponent }
        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
