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


        // this.router.navigate(['unauthorised']);  /// should be redirecte to another route :)
        return true;
    }
}
