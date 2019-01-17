import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAComponent } from '../admin/home/homeA.component';

const routes: Routes = [
    { path: '', component: HomeAComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
