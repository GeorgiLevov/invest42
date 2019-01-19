import '../polyfills';
import { MaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerGuard } from './shared/core/authentication/manager-guard.service';
import { AdminGuard } from './shared/core/authentication/admin-guard.service';
import { LoginModule } from './auth/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/core/authentication/token.interceptor';
import { RoleGuard } from './shared/core/authentication/role-guard.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterializeWrapModule } from './materialize-module/materialize.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    MaterializeWrapModule,
    SharedModule,
    AppRoutingModule,
    LoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AdminGuard,
    ManagerGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
