
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/authentication/role-guard.guard';
import { AuthenticationService } from './core/authentication/authentication.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [AuthenticationService, RoleGuard],
})
export class SharedModule { }
