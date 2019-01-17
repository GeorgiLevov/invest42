import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAComponent } from './home/homeA.component';
import { AdminRoutingModule } from './admin-route.module';

@NgModule({
  declarations: [HomeAComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
