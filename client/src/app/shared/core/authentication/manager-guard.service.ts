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
export class ManagerGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {


        if (Role.manager === this.auth.getRole()) {
            // this.router.navigate(['/']);
            return true;
        }

        this.router.navigate(['unauthorised']);  /// should be redirecte to another route :)
        return false;
    }
}
