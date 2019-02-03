import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Role } from '../../../../../../server/src/models/enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.getToken()) {
            return true;
        }

        if (this.auth.getRole() === Role.admin) {
            this.router.navigate(['admin']);
            return false;
        } else if (this.auth.getRole() === Role.manager) {
            this.router.navigate(['manager']);
            return false;
        }

        return true;
    }
}
