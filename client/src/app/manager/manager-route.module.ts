import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAComponent } from '../admin/home/homeA.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
