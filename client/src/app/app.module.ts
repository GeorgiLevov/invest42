import { AuthenticationService } from './shared/core/authentication/authentication.service';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './auth/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RoleGuard } from './shared/core/authentication/role-guard.guard';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ManagerModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => Promise.resolve(localStorage.getItem('token')),
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
