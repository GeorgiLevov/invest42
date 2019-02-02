import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from '@angular/router';
import { debug } from 'util';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { Role } from '../../../../../../server/src/models/enums/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {


        if (Role.admin === this.auth.getRole()) {
            // this.router.navigate(['admin']);
            return true;
        }

        this.router.navigate(['unauthorised']);
        return false;
    }
}
