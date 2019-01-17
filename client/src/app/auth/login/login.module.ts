import { LoginService } from './../services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MzButtonModule, MzInputModule, MzIconModule, MzIconMdiModule, MzCardModule, MzToastModule } from 'ngx-materialize';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MzButtonModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
