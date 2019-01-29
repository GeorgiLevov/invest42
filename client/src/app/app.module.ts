import { SpinnerInterceptor } from './shared/core/interceptors/spinner.interceptor.service';
import '../polyfills';
import { ManagerGuard } from './shared/core/authentication/manager-guard.service';
import { AdminGuard } from './shared/core/authentication/admin-guard.service';
import { LoginModule } from './auth/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/core/authentication/token.interceptor';
import { RoleGuard } from './shared/core/authentication/role-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ParallaxDirective } from './parallax.directive';


@NgModule({
  declarations: [
    AppComponent,
    ParallaxDirective,
  ],
  imports: [
    NgxSpinnerModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    LoginModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    AdminGuard,
    ManagerGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
