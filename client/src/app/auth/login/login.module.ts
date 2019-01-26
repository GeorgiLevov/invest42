import { MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { MaterializeWrapModule } from './../../materialize-module/materialize.module';
import { LoginService } from './../services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MzButtonModule, MzInputModule, MzIconModule, MzIconMdiModule, MzCardModule, MzToastModule } from 'ngx-materialize';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
