import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from '@angular/router';
import { debug } from 'util';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { Role } from '../../../models/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;

        if (expectedRole === this.auth.getRole()) {
            this.router.navigate(['admin']);
            return true;
        } else if (expectedRole === this.auth.getRole()) {
            this.router.navigate(['manager']);
            return true;
        }

        return false;
    }
}
