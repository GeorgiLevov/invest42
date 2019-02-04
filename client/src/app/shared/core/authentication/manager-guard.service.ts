import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Role } from '../../models/enums/role.enum';

@Injectable()
export class ManagerGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {
        if (Role.manager === this.auth.getRole()) {
            return true;
        }

        this.router.navigate(['unauthorised']);
        return false;
    }
}
